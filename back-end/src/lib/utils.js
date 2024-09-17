export function includeRelations(query) {
    const include = {};
    if (query.include) {
        const relations = query.include.split(',');
        for (let rel of relations) {
            include[rel] = true;
        }
    }
    return include;
}