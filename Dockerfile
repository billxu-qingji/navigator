FROM registry.qunhequnhe.com/fe/node-yarn:8 as builder
ADD . /app
WORKDIR /app
RUN npm install && yarn build

FROM registry.qunhequnhe.com/infra/nginx:0.4.0
COPY --from=builder /app/dist/* /usr/share/nginx/html/
