/**
 * NukeViet NVBox for CKEditor5
 * @version 4.x
 * @author VINADES.,JSC <contact@vinades.vn>
 * @copyright (C) 2009-2024 VINADES.,JSC. All rights reserved
 * @license GNU/GPL version 2 or any later version
 * @see https://github.com/nukeviet The NukeViet CMS GitHub project
 */

/* global document, window, setTimeout, URL */

import { Command, type Editor } from 'ckeditor5/src/core.js';

import type { Notification } from 'ckeditor5/src/ui.js';

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
	public override execute(href: string = '', options: Record<string, boolean> = {}): void {
		const editor = this.editor;

		if (href !== '') {
			// Trả lại khi pick
			console.log('execute nvbox command', href);
			return;
		}

		const browseUrl = this.editor.config.get('nvbox.browseUrl') || '';
		if (browseUrl == '') {
			const notification: Notification = editor.plugins.get('Notification');
			const t = editor.locale.t;

			notification.showWarning(t('browserUrl is not set.'), {
				title: t('Error config NVBox'),
				namespace: 'nvbox'
			});

			return;
		}

		let w = (screen.availWidth * 70 / 100);
		let h = (screen.availHeight * 70 / 100);

		var leftSc = (screen.width) ? (screen.width - w) / 2 : 0,
			topSc = (screen.height) ? (screen.height - h) / 2 : 0,
			settings = 'height=' + h + ',width=' + w + ',top=' + topSc + ',left=' + leftSc;
		window.open(browseUrl, 'filemanager', settings)?.focus();
	}
}
