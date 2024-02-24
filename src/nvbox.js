/**
 * NukeViet NVBox for CKEditor5
 * @version 4.x
 * @author VINADES.,JSC <contact@vinades.vn>
 * @copyright (C) 2009-2024 VINADES.,JSC. All rights reserved
 * @license GNU/GPL version 2 or any later version
 * @see https://github.com/nukeviet The NukeViet CMS GitHub project
 */
import { Plugin } from 'ckeditor5/src/core.js';
import NVBoxUI from './nvboxui.js';
export default class NVBox extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'NVBox';
    }
    /**
     * @inheritDoc
     */
    static get requires() {
        return [NVBoxUI];
    }
}
//# sourceMappingURL=nvbox.js.map