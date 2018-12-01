export default class Professions {
    categories = [];
    professions = [];
    relatedLength = 12;

    selected = {
        parent: null,
        child: null,
        category: null,
        related: null
    };

    constructor(categories, professions) {
        this.categories = categories;
        typeof professions === 'undefined' ? this.flattenProfessions() : this.professions = professions;
    }

    flattenProfessions() {
        let professions = this.categories.reduce((acc, current) => {
            acc.push(...current.professions);
            return acc;
        }, []);
        professions = professions.reduce((acc, current) => {
            if (acc.find(item => item._id === current._id)) {
                return acc;
            }
            acc.push(current);
            return acc;
        }, []);
        this.professions = professions;
    }

    select(value, valueAs = 'title') {
        const profession = this.findProfession(value, valueAs);
        if (profession.profession_id) {
            // The profession is a child
            this.selected.child = profession;
            this.selected.parent = this.findProfession(profession.profession_id, '_id');
        } else {
            this.selected.child = null;
            this.selected.parent = profession;
        }
        this.selectRelated();
    }

    selectRelated() {
        const categoryId = this.selected.parent.categories[0];
        const selectedProfId = this.selected.child ? this.selected.child._id : this.selected.parent._id;
        const catProfessions = this.categories.find(
            item => item._id === categoryId
        ).professions.filter(
            item => item._id !== selectedProfId
        );
        let related = [];
        for (let i = 0; i < catProfessions.length; i++) {
            const randomProf = catProfessions[Math.floor(Math.random() * catProfessions.length)];
            related = [...new Set([...related, randomProf])];
            if (related.length >= 12) break;
        }
        this.selected.related = related;
    }

    findProfession(value, valueAs) {
        if (!this.professions) return null;
        for (const profession of this.professions) {
            if (value === profession[valueAs]) {
                return profession;
            }
        }
    }

    getProfession(parent = false) {
        return this.selected;
    }
}
