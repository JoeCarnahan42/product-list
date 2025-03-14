"use client";
import { Provider } from "react-redux";
import store from "./store/configureStore";
import "bootstrap/dist/css/bootstrap.min.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Provider store={store}>
        <body className="text-center">{children}</body>
      </Provider>
    </html>
  );
}
