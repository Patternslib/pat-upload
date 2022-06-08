import pattern from "./pat-upload";
import utils from "@patternslib/patternslib/src/core/utils";

describe("pat-upload", () => {
    beforeEach(() => {
        document.body.innerHTML = "";
    });

    it("is initialized correctly", async () => {
        document.body.innerHTML = `<fieldset class="pat-upload" />`;

        pattern.init(document.querySelector(".pat-upload"));
        await utils.timeout(1);

        expect(document.body.querySelectorAll(".upload-area").length).toBe(1);
    });
});
