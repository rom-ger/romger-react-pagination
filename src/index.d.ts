import * as React from 'react';

interface RgReactPaginationProps {
    pageNo?: number;
    totalSize?: number;
    pageSize?: number;
    onChangeHandler?: (props: any) => any;
    prefixClass?: string;
    hideTotalCountString?: boolean;
    hidePreviousAndNextPageLinks?: boolean;
    showChangePageSize?: boolean;
}

export class RgReactPagination extends React.Component<RgReactPaginationProps, any> {}