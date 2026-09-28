FROM node:20-alpine
WORKDIR /app

# ওপেনএসএসএল এবং নেসেসারি লাইব্রেরি ইন্সটল করা
RUN apk add --no-cache openssl libc6-compat

# ডিপেন্ডেন্সি ফাইল কপি ও ইন্সটল
COPY package*.json ./
RUN npm ci

# পুরো প্রজেক্ট কপি করা
COPY . .

# প্রিজমা জেনারেট এবং নেক্সট জেএস বিল্ড
RUN npx prisma generate
RUN npm run build

EXPOSE 3000
ENV PORT=3000
ENV NODE_ENV=production

CMD ["npm", "run", "start"]