# L3 Project

## Опис
Цей проект є базовим веб-додатком на Node.js з використанням TypeScript, Express, MongoDB та React (через `express-react-views`). Підтримує сесійну аутентифікацію та захист даних.

---

## Вимоги
- Node.js >= 18
- npm >= 9
- MongoDB локально або доступний URI

---

## Встановлення

1. Клонувати репозиторій:
```bash
git clone <https://github.com/tardeus8/BlogL3.git>
cd l3

2. Встановити залежності:
npm install

3. Запустити одним з скриптів:
"test": "echo \"Error: no test specified\" && exit 1",
"dev": "nodemon --exec ts-node src/index.ts",
"build": "tsc",
"start": "node dist/index.js"

---

## dotenv
PORT=
MONGO_URI=
SESSION_SECRET=
