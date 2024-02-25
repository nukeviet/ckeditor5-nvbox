/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/* globals window */

import { Plugin } from 'ckeditor5/src/core.js';
import { CKEditorError } from 'ckeditor5/src/utils.js';
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
		return ['LinkEditing'] as const;
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
