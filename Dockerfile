FROM node:18.17.0 as builder
WORKDIR /app
ENV PATH /app/node_module/.bin:$PATH

copy clink-react-app/ /app
RUN npm install 
RUN npm run build

FROM nginx
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/clink-react-app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]