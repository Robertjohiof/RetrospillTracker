// src/app/Document.tsx
import styles from "./styles.css?url";

export const Document: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <html lang="en">
    <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>RetroSpillTracker</title>
        <meta name="description" content="Discover classic games, log your favorites and build your retro collection." />
        <link rel="modulepreload" href="/src/client.tsx" />
        <link rel="stylesheet" href={styles} />
    </head>
    <body>
      <div id="root">{children}</div>
      <script>import("/src/client.tsx")</script>
    </body>
  </html>
);
