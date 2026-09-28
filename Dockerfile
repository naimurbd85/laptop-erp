FROM node:20-alpine
WORKDIR /app

# ওপেনএসএসএল এবং নেসেসারি লাইব্রেরি ইন্সটল করা
RUN apk add --no-cache openssl libc6-compat

# প্রথমে পুরো প্রজেক্ট ফাইল কপি করা (যাতে প্রিজমা স্কিমা ও প্যাকেজ ফাইল একসাথে থাকে)
COPY . .

# ডিপেন্ডেন্সি ইন্সটল করা (এতে postinstall-এর prisma generate কোনো এরর দিবে না)
RUN npm ci

# নেক্সট জেএস বিল্ড
RUN npm run build

EXPOSE 3000
ENV PORT=3000
ENV NODE_ENV=production

CMD ["npm", "run", "start"]