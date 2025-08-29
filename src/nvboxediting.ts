/**
 * NukeViet NVBox for CKEditor5
 * @version 4.x
 * @author VINADES.,JSC <contact@vinades.vn>
 * @copyright (C) 2009-2024 VINADES.,JSC. All rights reserved
 * @license GNU/GPL version 2 or any later version
 * @see https://github.com/nukeviet The NukeViet CMS GitHub project
 */

/* globals window */

import { Plugin } from 'ckeditor5';
import { CKEditorError } from 'ckeditor5';
import { Notification } from 'ckeditor5';
import NVBoxCommand from './nvboxcommand.js';

export default class NVBoxEditing extends Plugin {
	/**
	 * @inheritDoc
	 */
	public static get pluginName() {
		return 'NVBoxEditing' as const;
	}

	/**
	 * @inheritDoc
	 */
	public static get requires() {
		return [Notification, 'LinkEditing'] as const;
	}

	/**
	 * @inheritDoc
	 */
	public init(): void {
		const editor = this.editor;

		if (!editor.plugins.has('ImageBlockEditing') && !editor.plugins.has('ImageInlineEditing')) {
			throw new CKEditorError('nvbox-missing-image-plugin', editor);
		}

		editor.commands.add('nvbox', new NVBoxCommand(editor));
	}
}
