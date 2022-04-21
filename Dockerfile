FROM node:18-slim
# Add `/node_modules/.bin` to $PATH
ENV PATH /node_modules/.bin:$PATH

RUN mkdir app
WORKDIR /app

RUN npm install express

COPY ./dist .
COPY server.js .

# Expose port 80
EXPOSE 80
ENV PORT 80

# Start the web app
CMD ["node", "server.js"]
