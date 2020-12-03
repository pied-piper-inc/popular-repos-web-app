FROM node:12-slim
# Add `/node_modules/.bin` to $PATH
ENV PATH /node_modules/.bin:$PATH
RUN npm install -g http-server

RUN mkdir app
WORKDIR /app

COPY ./dist .

# Expose port 8080
EXPOSE 8080

# Start the web app
CMD ["http-server"]