import { lazy, Suspense } from "react";
import Brand from "./components/brand/Brand";
import ComponentA from "./components/ComponentA";
import ComponentB from "./components/ComponentB";
import ComponentC from "./components/ComponentC";
import Environment from "./components/Environment";

const RemoteApp = lazy(() => import("web2/Component1"));

export default function App() {

  return (
    <main>
      <h1>ReactJS + Webpack</h1>
      <Environment />
      <Brand />
      <ComponentA />
      <ComponentB />
      <ComponentC />
      <Suspense fallback="Loading">
        <RemoteApp />
      </Suspense>
    </main>
  );
}
