/*eslint no-magic-numbers: [2, { "ignore": [-1, 0, 1, 5, 10, 30, 50, 100] }]*/

import React from 'react';
import * as ReactUltimatePagination from 'react-ultimate-pagination';
import classnames from 'classnames';
import { FlexBox } from '@romger/react-flex-layout';
import { RgReactInput } from '@romger/react-input';
import { RgReactBaseModal } from '@romger/react-modal-dialog';

class RgReactPagination extends React.Component {
    constructor(props = {}) {
        super(props);

        this.state = {
            pageNo: null,
            totalSize: null,
            totalPages: null,
            pageSize: null,
            showChangePageSize: false,
            changePageSizeValue: null,
            defaultValuePageSize: [5, 10, 30, 50, 100],
        };

        this.DEFAULT_PREFIX_CLASS = 'pagination-custom';
    }

    get iconArrowDown() {
        return <svg
            className={classnames(
                'select-icon'
            )}
            version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            width="24px" height="24px" viewBox="0 0 24 24" enableBackground="new 0 0 24 24">
            <path d="M7.41,8.59L12,13.17l4.59-4.58L18,10l-6,6l-6-6L7.41,8.59z" />
            <path fill="none" d="M0,0h24v24H0V0z" />
        </svg>;
    }

    componentDidMount() {
        let totalPages = Math.ceil(this.props.totalSize / this.props.pageSize);
        this.setState({
            pageNo: this.props.pageNo >= 0 ? this.props.pageNo + 1 : null,
            totalSize: this.props.totalSize,
            pageSize: this.props.pageSize,
            totalPages: totalPages <= this.state.pageNo ? this.state.pageNo + 1 : totalPages
        });
    }

    componentWillReceiveProps(nextProps) {
        let totalPages = Math.ceil(nextProps.totalSize / nextProps.pageSize);
        this.setState({
            pageNo: nextProps.pageNo >= 0 ? nextProps.pageNo + 1 : null,
            totalSize: nextProps.totalSize,
            totalPages: totalPages <= nextProps.pageNo ? nextProps.pageNo + 1 : totalPages,
            pageSize: nextProps.pageSize
        });
    }

    /**
     * Хэндлер на изменение номера страницы
     * @param {*} pageNo
     */
    onPageChange(pageNo) {
        this.setState({ pageNo: pageNo }, () => this.props.onChangeHandler({ pageNo: this.state.pageNo - 1, pageSize: this.state.pageSize }));
    }

    /**
     * Получить элемент страницы (номер) для пейджинации
     * @param {*} props
     */
    getPageElement(props) {
        const DEFAULT_PREFIX_CLASS = 'pagination-custom';
        const prefixClass = props.prefixClass ? props.prefixClass : DEFAULT_PREFIX_CLASS;
        let style = {};
        style[DEFAULT_PREFIX_CLASS + '__page-number--selected'] = this.state.pageNo === props.value;
        style[prefixClass + '__page-number--selected'] = this.state.pageNo === props.value;
        return (
            <div
                className={classnames(
                    DEFAULT_PREFIX_CLASS + '__page-number',
                    prefixClass + '__page-number',
                    DEFAULT_PREFIX_CLASS + '__pagination-item',
                    prefixClass + '__pagination-item',
                    style
                )}
                onClick={props.onClick}>
                {props.value}
            </div>
        );
    }

    /**
     * Получить элемент "..." для пейджинации
     * @param {*} props
     */
    getEllipsisElement(props) {
        const DEFAULT_PREFIX_CLASS = 'pagination-custom';
        const prefixClass = props.prefixClass ? props.prefixClass : DEFAULT_PREFIX_CLASS;
        return (
            <div
                className={classnames(
                    DEFAULT_PREFIX_CLASS + '__ellipsis',
                    prefixClass + '__ellipsis',
                    DEFAULT_PREFIX_CLASS + '__pagination-item',
                    prefixClass + '__pagination-item'
                )}
                onClick={props.onClick}>...</div>
        );
    }

    /**
     * Получить компонент для переключения на предыдуущую страницу
     * @param {*} props
     */
    getPreviousPageLinkElement(props) {
        const DEFAULT_PREFIX_CLASS = 'pagination-custom';
        const prefixClass = props.prefixClass ? props.prefixClass : DEFAULT_PREFIX_CLASS;
        return (
            <div
                className={classnames(
                    DEFAULT_PREFIX_CLASS + '__prev-page',
                    prefixClass + '__prev-page',
                    DEFAULT_PREFIX_CLASS + '__pagination-item',
                    prefixClass + '__pagination-item'
                )}>
                <FlexBox
                    row="end center"
                    onClick={props.onClick}>
                    <svg
                        className={classnames(
                            'pagination-icon'
                        )}
                        version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        width="24px" height="24px" viewBox="0 0 24 24" enableBackground="new 0 0 24 24">
                        <path d="M15.41,16.59L10.83,12l4.58-4.59L14,6l-6,6l6,6L15.41,16.59z" />
                        <path fill="none" d="M0,0h24v24H0V0z" />
                    </svg>
                </FlexBox>
            </div>
        );
    }

    /**
     * Получить компонент для переключения на следующую страницу
     * @param {*} props
     */
    getNextPageLinkElement(props) {
        const DEFAULT_PREFIX_CLASS = 'pagination-custom';
        const prefixClass = props.prefixClass ? props.prefixClass : DEFAULT_PREFIX_CLASS;
        return (
            <div
                className={classnames(
                    DEFAULT_PREFIX_CLASS + '__next-page',
                    prefixClass + '__next-page',
                    DEFAULT_PREFIX_CLASS + '__pagination-item',
                    prefixClass + '__pagination-item'
                )}>
                <FlexBox
                    row="end center"
                    onClick={props.onClick}>
                    <svg
                        className={classnames(
                            'pagination-icon'
                        )}
                        version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        width="24px" height="24px" viewBox="0 0 24 24" enableBackground="new 0 0 24 24" >
                        <path d="M8.59,16.59L13.17,12L8.59,7.41L10,6l6,6l-6,6L8.59,16.59z" />
                        <path fill="none" d="M0,0h24v24H0V0z" />
                    </svg>
                </FlexBox>
            </div>
        );
    }

    /**
     * Получение элемента-wrapper`a для пейджинации
     * @param {*} props
     */
    getWrapperElement(props) {
        const DEFAULT_PREFIX_CLASS = 'pagination-custom';
        const prefixClass = props.prefixClass ? props.prefixClass : DEFAULT_PREFIX_CLASS;
        return <FlexBox
            className={classnames(
                DEFAULT_PREFIX_CLASS,
                prefixClass
            )}
            row="start center">{props.children}</FlexBox>;
    }

    /**
     * Отображается ли пейджинация
     */
    isPaginationVisible() {
        return this.state.totalPages && this.state.totalSize;
    }

    /**
     * Получить объект стилей для родительского элемента
     * @param {*} prefixClass
     */
    getStyleParent(prefixClass) {
        let style = {};
        style[this.DEFAULT_PREFIX_CLASS + '__wrapper--without-border'] = !this.isPaginationVisible();
        style[prefixClass + '__wrapper--without-border'] = !this.isPaginationVisible();
        return style;
    }

    render() {
        let itemTypeToComponent = {
            'PAGE': this.getPageElement.bind(this),
            'ELLIPSIS': this.getEllipsisElement,
            'PREVIOUS_PAGE_LINK': this.getPreviousPageLinkElement,
            'NEXT_PAGE_LINK': this.getNextPageLinkElement
        };

        let UltimatePagination = ReactUltimatePagination.createUltimatePagination({
            itemTypeToComponent: itemTypeToComponent,
            WrapperComponent: this.getWrapperElement
        });

        let PREV_ELEMENT_COUNT = (this.state.pageNo - 1) * this.state.pageSize + 1;
        let NEXT_ELEMENT_COUNT = (this.state.pageNo * this.state.pageSize <= this.state.totalSize) ? this.state.pageNo * this.state.pageSize : this.state.totalSize;

        const prefixClass = this.props.prefixClass ? this.props.prefixClass : this.DEFAULT_PREFIX_CLASS;
        return (
            <FlexBox
                rowWrap={'sb ctr'}
                className={classnames(
                    this.DEFAULT_PREFIX_CLASS + '__wrapper',
                    prefixClass + '__wrapper',
                    this.getStyleParent(prefixClass)
                )}
            >
                {
                    !this.props.hideTotalCountString &&
                    this.isPaginationVisible() &&
                    <FlexBox
                        row="start"
                    >
                        {
                            !!this.props.showChangePageSize &&
                            <FlexBox
                                row="ctr"
                                className={classnames(
                                    this.DEFAULT_PREFIX_CLASS + '__page-size-wrapper',
                                )}
                                onClick={() => this.setState({ showChangePageSize: true, changePageSizeValue: this.props.pageSize })}
                            >
                                <div
                                    className={classnames(
                                        this.DEFAULT_PREFIX_CLASS + '__page-size-title',
                                    )}
                                >
                                    {this.props.pageSize}
                                </div>
                                <div
                                    className={classnames(
                                        this.DEFAULT_PREFIX_CLASS + '__page-size-icon',
                                    )}
                                >
                                    {this.iconArrowDown}
                                </div>
                            </FlexBox>
                        }
                        {
                            !this.props.hideTotalCountString &&
                            this.isPaginationVisible() &&
                            !!PREV_ELEMENT_COUNT &&
                            !!NEXT_ELEMENT_COUNT &&
                            !!this.state.totalSize &&
                            <div
                                className={classnames(
                                    this.DEFAULT_PREFIX_CLASS + '__current-page-range',
                                )}
                            >
                                {PREV_ELEMENT_COUNT + '-' + NEXT_ELEMENT_COUNT + ' из ' + this.state.totalSize}
                            </div>
                        }
                    </FlexBox>
                }
                {
                    this.state.showChangePageSize &&
                    <RgReactBaseModal
                        show
                        hideTitle
                        closeCallback={() => this.setState({ showChangePageSize: false })}
                        closeOnBackClick
                        currentWidth={181}
                        actions={[
                            {
                                title: 'Применить',
                                isDisabled: () => !this.state.changePageSizeValue || this.state.changePageSizeValue < 0,
                                onClick: () => this.setState({ showChangePageSize: false }, () => this.props.onChangeHandler({ pageNo: this.state.pageNo - 1, pageSize: this.state.changePageSizeValue })),
                            },
                        ]}
                    >
                        <FlexBox
                            column="start stretch"
                            className={classnames(
                                this.DEFAULT_PREFIX_CLASS + '__page-size-modal-wrap',
                            )}
                        >
                            <div
                                className={classnames(
                                    this.DEFAULT_PREFIX_CLASS + '__page-size-modal-input',
                                )}
                            >
                                <RgReactInput
                                    value={this.state.changePageSizeValue ? this.state.changePageSizeValue : ''}
                                    type="number"
                                    updateCallback={e => this.setState({ changePageSizeValue: e && e.target && e.target.value ? e.target.value : '' })}
                                    placeholder="своё значение"
                                />
                            </div>
                            {
                                this.state.defaultValuePageSize.map(number =>
                                    <FlexBox
                                        row="center center"
                                        key={number}
                                        className={classnames(
                                            this.DEFAULT_PREFIX_CLASS + '__page-size-modal-item',
                                            {
                                                [this.DEFAULT_PREFIX_CLASS + '__page-size-modal-item--selected']: `${this.state.changePageSizeValue}` === `${number}`,
                                            },
                                        )}
                                        onClick={() => this.setState({ changePageSizeValue: number })}
                                    >
                                        {number}
                                    </FlexBox>
                                )
                            }
                        </FlexBox>
                    </RgReactBaseModal>
                }
                {
                    this.isPaginationVisible()
                        ?
                        <FlexBox row="end">
                            <UltimatePagination
                                currentPage={this.state.pageNo}
                                totalPages={this.state.totalPages}
                                hideFirstAndLastPageLinks={true}
                                hidePreviousAndNextPageLinks={!!this.props.hidePreviousAndNextPageLinks}
                                onChange={this.onPageChange.bind(this)} />
                        </FlexBox>
                        : null
                }
            </FlexBox>
        );
    }
}

export default RgReactPagination;
