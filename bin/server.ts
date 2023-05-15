import { env } from "../src/config/env";

const PORT = process.env.PORT || 3000;
const ENV = process.env.ENV || "development";

(async function() {
    const { setupApp } = await import("../src/App");
    const app = setupApp()
    app.listen(PORT, () => {
        console.log('\x1b[36m%s\x1b[0m', `App running on port: ${PORT} - Environment: ${ENV}`);
    });
})()