/* ユーザーマスタ */
CREATE TABLE IF NOT EXISTS user_account (
    user_id VARCHAR(16) PRIMARY KEY
  , password VARCHAR(60)
  , role VARCHAR(10)
);
