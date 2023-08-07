#node 이미지로 빌드
FROM node:16.13.1
WORKDIR /app
ENV PATH /app/node_modules/.bin/$PATH

COPY . /app
RUN npm install 
RUN npm run build

#그 빌드파일을 nginx이미지로 보내 웹서버 실행
#nginx
FROM nginx:latest
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
