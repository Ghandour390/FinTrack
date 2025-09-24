# اختيار صورة Node.js Alpine (خفيفة)
FROM node:18-alpine

# تثبيت bash و curl (bash ضروري لـ wait-for-it.sh)
RUN apk add --no-cache bash curl

# تحديد مجلد العمل داخل الكونتينر
WORKDIR /usr/src/app

# نسخ package.json و package-lock.json لتثبيت dependencies
COPY package*.json ./

# تثبيت dependencies
RUN npm install

# تثبيت netcat حتى يمكن تشغيل wait-for-it.sh (الذي يستخدم bash و nc) على alpine
RUN apk add --no-cache netcat-openbsd

# نسخ باقي ملفات المشروع
COPY . .

# إعطاء صلاحيات التنفيذ لـ wait-for-it.sh
RUN chmod +x wait-for-it.sh

# أمر تشغيل الحاوية: ننتظر MySQL ثم نشغل server.js
CMD ["/usr/src/app/wait-for-it.sh", "mysql:3306", "--", "node", "server.js"]
