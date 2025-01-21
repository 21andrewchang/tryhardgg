export function onKeyDown(
	event: KeyboardEvent,
	habit: { current: string },
	tag: { current: string },
	tags: { name: string }[],
	tagDropdown: { current: boolean },
	props: any,
	command: { current: boolean }
) {
	if (event.metaKey && event.key === '1') {
		habit.current = '0';
		event.preventDefault();
	}
	if (event.metaKey && event.key === '2') {
		habit.current = '1';
		event.preventDefault();
	}
	if (event.metaKey && event.key === '3') {
		habit.current = '2';
		event.preventDefault();
	}
	if (event.metaKey && event.key === '4') {
		tagDropdown.current = true;
		event.preventDefault();
	}
	if (!event.metaKey && tagDropdown.current && event.key === '1') {
		tag.current = tags[0].name;
		tagDropdown.current = false;
		event.preventDefault();
	}
	if (!event.metaKey && tagDropdown.current && event.key === '2') {
		tag.current = tags[1].name;
		tagDropdown.current = false;
		event.preventDefault();
	}
	if (!event.metaKey && tagDropdown.current && event.key === '3') {
		tag.current = tags[2].name;
		tagDropdown.current = false;
		event.preventDefault();
	}
	if (!event.metaKey && tagDropdown.current && event.key === '4') {
		tag.current = tags[3].name;
		tagDropdown.current = false;
		event.preventDefault();
	}
	if (event.metaKey && event.key === 'Enter') {
		props.handleNote();
	}
	if (event.metaKey) {
		command.current = true;
	}
}

export function onKeyUp(event: KeyboardEvent, command: { current: boolean }) {
	if (!event.metaKey) {
		command.current = false;
	}
}
