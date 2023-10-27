FROM node:18

WORKDIR /home/chief/responsible-distribution-v5

# установка зависимостей
# символ астериск ("*") используется для того чтобы по возможности
# скопировать оба файла: package.json и package-lock.json
COPY package*.json ./

RUN npm install
# Если вы создаете сборку для продакшн
# RUN npm ci --omit=dev

COPY . .

COPY ./dist ./dist

CMD ["npm", "start"]
