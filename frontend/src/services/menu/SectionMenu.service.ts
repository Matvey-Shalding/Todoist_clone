export class SectionMenu {
	searchSection(
		e: React.ChangeEvent<HTMLInputElement>,
		setSearchedSection: React.Dispatch<React.SetStateAction<string>>,
		setFilteredSections: React.Dispatch<React.SetStateAction<string[]>>,
		sections: string[]
	) {
		const searchTerm = e.target.value;
		setSearchedSection(searchTerm);
		const filteredSections = sections.filter(item =>
			item.toLowerCase().includes(searchTerm.toLowerCase())
		);
		setFilteredSections(filteredSections);
	}
}

export const sectionMenuService = new SectionMenu()
