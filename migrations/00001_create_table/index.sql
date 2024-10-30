CREATE TABLE IF NOT EXISTS items (
  item_id bigserial primary key,
  name varchar(255) NOT NULL,
  min_price DEC(7,2),
  min_price_tradable DEC(7,2),
  quantity int NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
  user_id bigserial primary key,
  username varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  balance DEC(7,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS sessions (
  session_key bigint primary key,
  user_id bigserial NOT NULL,
  CONSTRAINT fk_user
    FOREIGN KEY(user_id)
      REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS purchases (
  purchase_id bigserial primary key,
  user_id bigserial NOT NULL,
  item_id bigserial NOT NULL,
  purchased_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_user
  FOREIGN KEY(user_id)
    REFERENCES users(user_id),
  CONSTRAINT fk_item
  FOREIGN KEY(item_id)
    REFERENCES items(item_id)
);