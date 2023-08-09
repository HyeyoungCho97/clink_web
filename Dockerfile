FROM node:14.17.0 as builder
WORKDIR /app
#ENV PATH /app/node_module/.bin:$PATH

copy clink-react-app/ /app
#RUN npm install -g npm@9.8.1
#RUN npm cache clean --force
#RUN npm remove @babel/plugin-proposal-private-property-in-object
#RUN npm add --dev @babel/plugin-proposal-private-property-in-object
#RUN npm install --save-dev @babel/plugin-proposal-private-property-in-object
#RUN npm cache verify
#RUN npm install 
#RUN npm run build
RUN npm install yarn
RUN yarn #same as npm install
RUN yarn build

FROM nginx
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/clink-react-app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]