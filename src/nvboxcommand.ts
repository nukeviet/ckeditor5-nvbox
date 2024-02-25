/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/* global document, window, setTimeout, URL */

import { Command, type Editor } from 'ckeditor5/src/core.js';

export default class NVBoxCommand extends Command {
	constructor(editor: Editor) {
		super(editor);

		// The NVBox command does not affect data by itself.
		this.affectsData = false;

		// Remove default document listener to lower its priority.
		this.stopListening(this.editor.model.document, 'change');

		// Lower this command listener priority to be sure that refresh() will be called after link & image refresh.
		this.listenTo(this.editor.model.document, 'change', () => this.refresh(), { priority: 'low' });
	}

	/**
	 * @inheritDoc
	 */
	public override refresh(): void {
		console.log('refresh nvbox command');

		const imageCommand = this.editor.commands.get('insertImage')!;
		const linkCommand = this.editor.commands.get('link')!;

		// The NVBox command is enabled when one of image or link command is enabled.
		this.isEnabled = imageCommand.isEnabled || linkCommand.isEnabled;
	}

	/**
	 * @inheritDoc
	 */
	public override execute(): void {
		console.log('execute nvbox command');
	}
}
