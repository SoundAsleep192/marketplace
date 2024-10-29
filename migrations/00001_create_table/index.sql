CREATE TABLE IF NOT EXISTS items (
  item_id bigserial primary key,
  name varchar(255) NOT NULL,
  min_price float,
  min_price_tradable float,
  quantity int NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
  user_id bigserial primary key,
  username varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  balance int NOT NULL
);

CREATE TABLE IF NOT EXISTS sessions (
  session_key bigint primary key,
  user_id bigserial NOT NULL,
  CONSTRAINT fk_user
    FOREIGN KEY(user_id)
      REFERENCES users(user_id)
);