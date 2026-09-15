/* ユーザーマスタ */
CREATE TABLE IF NOT EXISTS user_account (
    user_id VARCHAR(50) PRIMARY KEY
  , password VARCHAR(100)
  , user_name VARCHAR(50)
  , role VARCHAR(50)
);
