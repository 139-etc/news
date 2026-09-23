/* ユーザーマスタ */
CREATE TABLE IF NOT EXISTS user_account (
    user_id VARCHAR(16) PRIMARY KEY
  , password VARCHAR(60)
  , role VARCHAR(10)
);

/* コード定義(カテゴリ) */
CREATE TABLE IF NOT EXISTS code_category (
    id VARCHAR(2) PRIMARY KEY
  , content VARCHAR(10)
);

/* コード定義(期間) */
CREATE TABLE IF NOT EXISTS code_period (
    id VARCHAR(2) PRIMARY KEY
  , content VARCHAR(10)
);
