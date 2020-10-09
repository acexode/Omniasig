import { _ } from 'lodash';

export const replaceHelper = ( data: any, queryToReplace: string, queryToReplaceWith: string ) => {
    let text = '';
    console.log( isNaN( data ) );
    isNaN( data ) ? text = data : text = data.toString();

    return text.replace(queryToReplace, queryToReplaceWith );
};
