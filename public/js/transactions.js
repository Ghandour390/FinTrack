function openAddModal() {
  document.getElementById('addModal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('addModal').style.display = 'none';
}

function editTransaction(id) {
  fetch(`/api/transactions/${id}`)
    .then(response => response.json())
    .then(transaction => {
      document.getElementById('editId').value = transaction.id;
      document.getElementById('editDescription').value = transaction.description;
      document.getElementById('editAmount').value = transaction.montant;
      document.getElementById('editType').value = transaction.type;
      document.getElementById('editCategory').value = transaction.categorie_id;
      document.getElementById('editDate').value = transaction.date.split('T')[0];
      document.getElementById('editModal').style.display = 'flex';
    });
}

function closeEditModal() {
  document.getElementById('editModal').style.display = 'none';
}

function deleteTransaction(id) {
  if (confirm('Are you sure you want to delete this transaction?')) {
    fetch(`/api/transactions/${id}`, { method: 'DELETE' })
      .then(() => location.reload());
  }
}

document.addEventListener('DOMContentLoaded', function () {
    // console.log("test");
  try {
    var params = new URLSearchParams(window.location.search);
    if (params.get('new') === '1') {
      openAddModal();
    }
  } catch (e) {
    console.log("error",e);
  }
  

  var transactionForm = document.getElementById('transactionForm');
  if (transactionForm) {
    transactionForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      var formData = new FormData(e.target);
      var data = Object.fromEntries(formData);

      console.log('Payload POST /api/transactions', data);

      try {
        var res = await fetch('/api/transactions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        if (!res.ok) {
          var errText = await res.text();
          console.error('Create transaction failed', res.status, errText);
          alert('Erreur lors de la création de la transaction.');
          return;
        }
        await res.json();
        location.reload();
      } catch (err) {
        console.error('Network error while creating transaction', err);
        alert('Erreur réseau.');
      }
    });
  }

  var editForm = document.getElementById('editForm');
  if (editForm) {
    editForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      var id = document.getElementById('editId').value;
      var data = {
        description: document.getElementById('editDescription').value,
        amount: document.getElementById('editAmount').value,
        type: document.getElementById('editType').value,
        categoryId: document.getElementById('editCategory').value,
        date: document.getElementById('editDate').value
      };

      await fetch(`/api/transactions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      location.reload();
    });
  }
});


