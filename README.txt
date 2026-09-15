Readme

# News Insight Hub

AIを活用してニュースの要約・検索・トレンド分析を行うWebアプリケーションです。

複数のマイクロサービスを連携させる構成を採用し、React・Java・Go・Pythonを役割ごとに分離して開発しています。

## コンセプト

- エンドユーザー向けのモダンなニュース閲覧サービス
- Javaを中心とした業務システム構成
- Goによる大量データ処理
- PythonによるAI分析
- 複数サービスを連携させた実践的なポートフォリオ

## 主な機能

### ニュース要約

- 日付で絞り込み
- 国で絞り込み
- ジャンルで絞り込み
- AIによる要約生成
- 要約結果の保存

### ニュース検索

- 日付で検索
- 国で検索
- ジャンルで検索
- ニュース一覧表示
- 検索結果の保存

### 保存機能

- 保存した要約の一覧表示
- 保存した検索結果の一覧表示
- 保存データの削除

### 非表示機能

- 特定ニュースの非表示
- 非表示ニュースの管理

### 架空ニュース生成

- 保存済みニュースを選択
- AIによる虚構新聞風ニュース生成
- 生成結果の保存

## システム構成

### フロントエンド

- React
- TypeScript
- Cloudflare Pages
- SPA構成

### バックエンド

- Java
- Spring Boot
- Go
- Python
- Google Cloud Run
- 各言語を独立したサービスとして構成

### データベース

- Oracle Autonomous AI Database

### ファイルストレージ

- Cloudflare R2
- 将来的なファイル機能に対応予定

## 各サービスの役割

### React / TypeScript

- エンドユーザー向け画面
- SPA
- API通信
- UI制御

### Java

- REST API
- 業務ロジック
- 認証・認可
- データベース管理
- Go・Pythonとの連携

### Go

- GDELTからニュース取得
- 大量データ処理
- 並列処理
- データ整理

### Python

- AI要約
- AI翻訳
- トレンド分析
- 架空ニュース生成

## 処理フロー

### ニュース要約・トレンド分析

React → Java → GDELT → Go → Python → Java → React

### ニュース検索

React → Java → GDELT → Java → React

### 保存データ表示

React → Java → Database → Java → React

### 架空ニュース生成

Database → Java → React → Java → Go → Python → Java → React

## 開発環境

### フロントエンド

- React
- TypeScript
- Cloudflare Pages
- SPA構成

### バックエンド

- Java
- Spring Boot
- Go
- Python
- Google Cloud Run
- 各言語を独立したサービスとして構成

### データベース

- Oracle Autonomous AI Database

### ファイルストレージ

- Cloudflare R2

### 開発・管理

- Git
- GitHub
- GitHub Issues
- VS Code
- フロント・バック双方でログ出力

## 環境選定

### フロントエンド

Cloudflare Pages

- SPA向けの静的ホスティング
- GitHub連携
- CDN配信
- 無料プラン

### バックエンド

Google Cloud Run

- Dockerコンテナ対応
- Java・Go・Pythonを独立デプロイ
- REST API構成
- 自動スケーリング

### データベース

Oracle Autonomous AI Database

- Always Free
- マネージドDB
- Javaから利用可能

### ファイルストレージ

Cloudflare R2

- S3互換API
- オブジェクトストレージ
- 将来的なファイル保存に利用

## ログ設計

全サービスでログを出力し、サービス間でRequest IDを引き継ぐ構成を採用しています。

### ログ対象

- APIリクエスト
- データ取得
- AI処理
- データベース操作
- エラー
- 処理時間

## テスト

### Java

- JUnit
- Mockito

### Go

- go test

### Python

- pytest

## ロードマップ

### Phase1

- プロジェクト基盤構築
- Java API
- React画面
- DB接続

### Phase2

- ニュース検索
- 保存機能
- 非表示機能

### Phase3

- Goサービス追加
- GDELT連携
- 大量データ処理

### Phase4

- Pythonサービス追加
- AI要約
- AI翻訳
- トレンド分析

### Phase5

- 架空ニュース生成
- ログ強化
- Request ID対応
- デプロイ
- 動作検証

## 開発方針

- GitHub Issuesによるタスク管理
- 段階的な機能追加
- マイクロサービス構成
- 実務を意識したログ設計
- CI/CDを見据えた構成
- モダンなWeb技術の習得