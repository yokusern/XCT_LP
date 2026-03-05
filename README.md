# XCT (Cross Consulting Team) - Professional LP Suite

このリポジトリは、戦略的コンサルティングチーム「XCT」の公式ランディングページおよびデータ管理システム一式を含んでいます。

## 🚀 ディレクトリ構造

- `index.html`: ビジネス（企業向け）と学生（エリート学生向け）への分岐トップページ。
- `business.html`: 結論先行型LP。プラン比較表とPASONAの法則を応用。
- `student.html`: 特別感を演出するエリート学生向けLP。ガバナンスを強調。
- `contact.html`: 動的問い合わせフォーム。URLパラメータによるデフォルト値の設定。
- `style.css`: Tailwind CSSベース。独自のデザインシステム、流動的タイポグラフィ、アニメーションを定義。
- `main.js`: スティッキーヘッダー、スクロールアニメーション、API通信、パラメータ処理の統合ロジック。
- `code.gs`: Google Apps Script用コード。Google SheetsとSlack通知の統合。
- `og-image.png`: SNS共有用（OGP）プレビュー画像。

## ✨ 高度なUX仕様

1. **流動的文字組み**: `clamp()` 関数を用いたレスポンシブな文字サイズ設定。
2. **スティッキー・ガバナンス**: スクロール時に透過からソリッド（ネイビー）へ変化するナビゲーション。
3. **スクロール演出**: Intersection Observerを用いたセクションの段階的な出現。
4. **物理フィードバック**: ボタンクリック時のスケール縮小（0.3s）による操作感の向上。
5. **導入ステップ・ハイライト**: 導入手順のスクロールに合わせた自動強調。

## 🛠 デプロイ手順

### フロントエンド (Vercel)

1. GitHubリポジトリをVercelにインポートします。
2. そのまま「Deploy」をクリックするだけで、自動的に公開されます。

### バックエンド (Google Apps Script)

1. Googleスプレッドシートを作成し、拡張機能から「Apps Script」を開きます。
2. `code.gs` の内容をコピー＆ペーストします。
3. `SLACK_WEBHOOK_URL` を設定します。
4. 「新しいデプロイ」から「ウェブアプリ」を選択し、アクセスできるユーザーを「全員」にしてデプロイします。
5. 発行された `URL` を `main.js` の `GAS_ENDPOINT` （または環境変数）に設定してください。

---

Built by **Antigravity** - Pro-Engineer for XCT Project.
