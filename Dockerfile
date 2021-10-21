FROM node:16-slim
# Add `/node_modules/.bin` to $PATH
ENV PATH /node_modules/.bin:$PATH
RUN npm install -g http-server

RUN mkdir app
WORKDIR /app

COPY ./dist .

# Expose port 80
EXPOSE 80
ENV PORT 80

# Start the web app
CMD ["http-server"]
