"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchParser = void 0;
class SearchParser {
    parse({ data, options }) {
        const { type } = options;
        return type === 'results'
            ? this.parseResults({ data, options })
            : this.parseFacets({ data, options });
    }
    parseResults({ data, options }) {
        if (options && "limit" in options) {
            var { offset, limit, sort, total_count } = options;
        }
        const search_result = {
            limit,
            offset,
            sort,
            total_count,
            results: []
        };
        search_result.results = this.parseResultsItems(data, options);
        return search_result;
    }
    parseFacets({ data, options }) {
        let global_sum = 0;
        const { facets } = options;
        const agg_res = {
            inputs: {
                total_count: 0,
                facets: {}
            }
        };
        //header and inputs
        for (const key in data) {
            let sum = 0;
            let values = [];
            data[key].buckets.map((agg) => {
                values.push({
                    text: agg.key,
                    counter: agg.doc_count,
                    payload: agg.key
                });
                sum = sum + 1;
            });
            global_sum = global_sum + sum;
            const facet = {
                total_count: sum,
                values,
            };
            agg_res.inputs.facets[key] = facet;
            agg_res.inputs.total_count = global_sum;
        }
        facets.forEach(facet => {
            agg_res.inputs.facets[facet.id].values = agg_res.inputs.facets[facet.id].values.filter((o) => o.text.includes(facet.query));
        });
        return agg_res;
    }
}
exports.SearchParser = SearchParser;
