import {
    StyleSheet,
    Dimensions
} from 'react-native';
const {
    width,
    height
} = Dimensions.get('window');
const heightPopup = 220;
const heightResult = 300;
const heightSearch = height - 15;
const imageWidth = width;
const imageHeight = (imageWidth / 3900) * 2092;

export default StyleSheet.create({
    containerLoading: {
        flex: 1,
        justifyContent: 'center'
    },
    //calc debt
    content: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
    },
    txtHeader: {
        fontWeight: '600',
        fontSize: 14,
        color: '#053654',
        paddingBottom: 5
    },
    item: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingTop: 10
    },
    inputItem: {
        borderColor: '#808080',
        height: 40,
        marginLeft: 0,
        width: '100%',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderLeftWidth: 1,
        borderTopWidth: 1,
        borderBottomWidth: 1
    },
    rightBtn: {
        backgroundColor: '#F58319',
        justifyContent: 'center',
        width: '15%',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20
    },
    calcCondition: {
        flexDirection: 'row',
        width: '100%',
        paddingTop: 5
    },
    inputLeft: {
        borderColor: '#808080',
        borderWidth: 1,
        height: 40,
        width: width / 4.2,
        marginLeft: 0,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20
    },
    inputCenter: {
        borderColor: '#808080',
        borderWidth: 1,
        height: 40,
        width: width / 4.2,
    },
    inputRight: {
        borderColor: '#808080',
        borderWidth: 1,
        height: 40,
        width: width / 4.2,
    },
    labelBtn: {
        backgroundColor: '#F58319',
        justifyContent: 'center',
        width: '10%',
        // borderTopRightRadius: 2,
        // borderBottomRightRadius: 2,
        marginRight: 5,
        marginLeft: 0
    },
    closeCondition: {
        backgroundColor: 'gray',
        justifyContent: 'center',
        width: '5%',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20
    },
    btnAdd: {
        width: '100%',
        height: 40,
        borderRadius: 20,
        backgroundColor: 'gray',
        justifyContent: 'center',
        padding: 10,
        marginTop: 15,
    },
    txtBtn: {
        color: 'white',
        textAlign: 'center',
        fontSize: 10
    },
    bigBtn: {
        height: 40,
        width: '100%',
        borderRadius: 20,
        backgroundColor: '#F58319',
        justifyContent: 'center',
        marginTop: 5,
    },
    headerRow: {
        width: '20%',
        height: 40,
        borderWidth: 1,
        justifyContent: 'center',
        borderColor: '#dee2e6'
    },
    textHeader: {
        textAlign: 'center',
        color: 'white',
        fontWeight: '600',
        fontSize: 12
    },
    textCell: {
        textAlign: 'center',
        color: '#666',
        fontSize: 10
    },
    cell: {
        width: '20%',
        height: 30,
        borderWidth: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        borderColor: '#dee2e6'
    },
    groupPickerIcon: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 5,
        height: 40
    },
    sectionPickerIcon: {
        height: 40,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderLeftWidth: 1,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#808080',
        overflow: 'hidden'
    },
    //mapscreen
    wrapper: {
        flex: 1,
        backgroundColor: '#F6F6F6'
    },
    mapQuickAction: {
        width: '25%',
        alignItems: 'center'
    },
    textQuickAction: {
        fontSize: 8,
        textAlign: 'center'
    },
    mapContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#FFFFFF',
        // margin: 10,
        borderRadius: 2,
        shadowColor: '#3B5458',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.2,
    },
    actionContainer: {
        justifyContent: 'flex-end',
        padding: 10,
        borderRadius: 2,
        shadowColor: '#3B5458',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.2
    },
    subView: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#EAF0F3',
        height: heightSearch
    },
    popupProject: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        height: heightPopup
    },
    iconStyle: {
        width: 20,
        height: 20
    },
    btnProject: {
        backgroundColor: 'white',
        borderRadius: 15,
        height: 30,
        marginTop: 5,
        marginRight: 5,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#33563743'
    },
    txtBtnProject: {
        fontWeight: '400',
        marginHorizontal: 15,
        fontSize: 12,
        color: 'black'
    },
    popupResult: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        height: heightResult
    },
    toolSearch: {
        position: 'absolute',
        bottom: 0,
        width,
        padding: 5,
    },
    toolContent: {
        backgroundColor: 'white',
        padding: 5,
        margin: 10,
        borderRadius: 5,
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowColor: '#000',
        shadowOpacity: 0.2,
        elevation: 3,
        // background color must be set
        // backgroundColor: "#0000" // invisible color
    },
    sectionInput: {
        paddingTop: 5,
        backgroundColor: 'white',
        height: 40,
        borderRadius: 5,
        borderColor: '#33563743',
        flexDirection: 'row'
    },
    fakeInputSearch: {
        marginTop: 10,
        borderBottomWidth: 1,
        borderColor: '#cecece',
        marginLeft: 15,
        width: width / 1.4
    },
    iconSearch: {
        color: '#F58319',
        marginLeft: 10,
        fontSize: 20,
        marginTop: 5
    },
    txtAdvanceSearch: {
        textAlign: 'center',
        fontSize: 12,
        color: '#053654'
    },
    btnMapOrange: {
        width: 50,
        height: 50,
        backgroundColor: '#F58319',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnMapRed: {
        width: 50,
        height: 50,
        backgroundColor: 'red',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnMapGreen: {
        width: 50,
        height: 50,
        backgroundColor: 'green',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnMapBlue: {
        width: 50,
        height: 50,
        backgroundColor: '#004a80',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    //previewproject
    thumbProject: {
        width: 120,
        height: 120,
        marginRight: 5
    },
    btnDetail: {
        height: 30,
        borderRadius: 5,
        backgroundColor: '#F58319',
        width: '40%',
        marginRight: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        // borderWidth: 1
    },
    btnTable: {
        height: 30,
        borderRadius: 5,
        backgroundColor: '#F58319',
        justifyContent: 'center',
        width: '20%',
        alignItems: 'center',
        marginRight: 1,
    },
    icTitle: {
        width: 2,
        height: 13
    },
    title: {
        fontWeight: '600',
        fontSize: 16,
        paddingLeft: 5,
        color: '#053654'
    },
    txtDetail: {
        fontWeight: '500',
        marginHorizontal: 15,
        fontSize: 14,
        color: 'white',
        marginTop: 5
    },
    iconBtn: {
        color: '#fff',
        fontSize: 14
    },
    actionPreview: {
        flexDirection: 'row',
        paddingTop: 5
    },
    //advancesearch
    inputStyle: {
        height: 40,
        marginBottom: 10,
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#cecece',
        backgroundColor: '#fff',
        borderRadius: 20
    },
    btnSellActive: {
        width: (width - 50) / 2,
        height: 30,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        backgroundColor: '#177dba',
        marginTop: 15,
        justifyContent: 'center',
    },
    btnSellDeactive: {
        width: (width - 50) / 2,
        height: 30,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        backgroundColor: '#d7d7d7',
        marginTop: 15,
        justifyContent: 'center',
    },
    btnRentActive: {
        width: (width - 50) / 2,
        height: 30,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        backgroundColor: '#177dba',
        marginTop: 15,
        justifyContent: 'center',
    },
    btnRentDeactive: {
        width: (width - 50) / 2,
        height: 30,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        backgroundColor: '#d7d7d7',
        marginTop: 15,
        justifyContent: 'center',
    },
    textBtnActive: {
        fontSize: 14,
        textAlign: 'center',
        color: '#fff',
        fontWeight: '600'
    },
    textBtnDeactive: {
        fontSize: 14,
        textAlign: 'center',
        color: '#666',
        fontWeight: '600'
    },
    titleGroup: {
        fontSize: 14,
        paddingTop: 5,
        color: '#000',
        fontWeight: '600'
    },
    rowOption: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        paddingTop: 5
    },
    option: {
        borderWidth: 1,
        borderColor: '#33563743',
        width: '48%',
        marginTop: 5,
        borderRadius: 20,
        backgroundColor: 'white',
        height: 40,
    },
    optionAlone: {
        borderWidth: 1,
        borderColor: '#33563743',
        width: '100%',
        borderRadius: 20,
        backgroundColor: 'white',
        height: 40
    },
    btnSearch: {
        backgroundColor: '#F58319',
        height: 40,
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 20,
        justifyContent: 'center',
    },
    textBtnSearch: {
        textAlign: 'center',
        color: 'white',
        fontWeight: '600',
        fontSize: 16
    },
    picker: { height: 40 },
    //table package
    container: {
        flex: 1
    },
    firstCol: {
        width: 80,
        height: 40,
        borderWidth: 1,
        backgroundColor: '#A52D2D',
        justifyContent: 'center',
        borderColor: '#dee2e6'
    },
    col: {
        width: 80,
        height: 40,
        borderWidth: 1,
        backgroundColor: '#F68121',
        justifyContent: 'center',
        borderColor: '#dee2e6'
    },
    row: {
        width: 80,
        height: 40,
        borderWidth: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        borderColor: '#dee2e6'
    },
    firstRow: {
        width: 80,
        height: 40,
        borderWidth: 1,
        backgroundColor: '#F68121',
        justifyContent: 'center',
        borderColor: '#dee2e6'
    },
    textFirstCol: {
        textAlign: 'center',
        color: 'white',
        fontWeight: '500',
        fontSize: 12
    },
    textFirstRow: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: '500'
    },
    // textRow: {
    //     textAlign: 'center',
    //     color: '#666'
    // },
    list: {
        justifyContent: 'center',
        flexDirection: 'row',
    },
    note: {
        flexDirection: 'row',
        paddingTop: 5,
        width: '50%'
    },
    avaiable: {
        width: 80,
        height: 40,
        borderWidth: 1,
        backgroundColor: '#6EC9FF',
        justifyContent: 'center',
        borderColor: '#dee2e6'
    },
    sold: {
        width: 80,
        height: 40,
        borderWidth: 1,
        backgroundColor: '#F68121',
        justifyContent: 'center',
        borderColor: '#dee2e6'
    },
    waiting: {
        width: 80,
        height: 40,
        borderWidth: 1,
        backgroundColor: '#FFDA23',
        justifyContent: 'center',
        borderColor: '#dee2e6'
    },
    holding: {
        width: 80,
        height: 40,
        borderWidth: 1,
        backgroundColor: '#FF9323',
        justifyContent: 'center',
        borderColor: '#dee2e6'
    },
    disabled: {
        width: 80,
        height: 40,
        borderWidth: 1,
        backgroundColor: 'gray',
        justifyContent: 'center',
        borderColor: '#dee2e6'
    },
    incomplete: {
        width: 80,
        height: 40,
        borderWidth: 1,
        backgroundColor: '#c2c2c2',
        justifyContent: 'center',
        borderColor: '#dee2e6'
    },
    //set Calendar
    sectionAction: {
        paddingHorizontal: 15,
        paddingTop: 15,
        justifyContent: 'space-around',
        marginBottom: 10,
        width,
        flexDirection: 'row'
    },
    btnAction: {
        width: '45%',
        borderColor: '#33563743',
        borderWidth: 1,
        alignItems: 'center',
        borderRadius: 5,
        height: height / 5,
        justifyContent: 'center'
    },
    btnTextAction: {
        fontSize: 12,
        fontWeight: '500',
        textAlign: 'center'
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageSlide: {
        height: imageHeight,
        width: imageWidth,
        justifyContent: 'center',
        alignItems: 'center'
    },
    sectionMoneyOrder: {
        width: '100%',
        flexDirection: 'row',
        marginTop: 5,
        height: 40,
    },
    btnSubmit: {
        width: (width - 50) / 2,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#177dba',
        marginTop: 5,
        justifyContent: 'center'
    },
    btnCancel: {
        width: (width - 50) / 2,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#464646',
        marginTop: 5,
        justifyContent: 'center'
    },
    textSuggest: {
        fontSize: 12,
        color: '#555',
        paddingTop: 10,
        fontStyle: 'italic'
    },
    inputMoney: {
        fontSize: 12,
        width: '45%',
        borderWidth: 1,
        borderColor: '#cecece'
    },
    labelMoney: {
        color: '#fff',
        textAlign: 'center'
    },
    sectionInputMoney: {
        backgroundColor: '#1f7eb8',
        height: '100%',
        width: '40%',
        justifyContent: 'center',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20
    },
    inputInline: {
        height: 40,
        marginBottom: 10,
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#cecece',
        width: '48%',
        borderRadius: 20
    },
    lineInfo: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderStyle: 'dotted',
        borderBottomColor: '#959595',
        // marginTop: 10,
        marginBottom: 10
    },
    titleScreen: {
        fontWeight: '600',
        fontSize: 18,
        textAlign: 'center',
        color: '#053654',
        paddingTop: 10
    },
    headerSection: {
        height: height / 13,
        backgroundColor: '#F58319',
        // padding: 10,
        justifyContent: 'space-around'
    },
    headerAction: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 5
    },
    modalAction: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
    },
    iconHeaderStyle: {
        width: 20,
        height: 20,
        marginLeft: 10
    },
    //menu
    menu: {
        flex: 1,
        backgroundColor: 'white',
        borderRightWidth: 3,
        borderColor: '#fff',
        paddingLeft: 20,
        paddingTop: 20
    },
    headerInfo: {
        flexDirection: 'row',
        height: height / 10
    },
    iconAvatar: {
        width: 50,
        height: 50
    },
    infoUser: {
        paddingLeft: 15,
        paddingTop: 10
    },
    textHeading: {
        fontSize: 16,
        fontWeight: '500',
        color: '#f48120'
    },
    underLine: {
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
        width: '90%',
        paddingTop: 5,
    },
    btnMenu: {
        paddingTop: 20,
        flexDirection: 'row',
        height: 45
    },
    iconMenu: {
        width: 20,
        height: 20
    },
    textMenu: {
        fontSize: 14,
        paddingLeft: 10,
    },
    logoMenu: {
        width: width / 2,
        height: ((width / 2) / 492) * 79,
        marginVertical: 10
    },
    subTitleScreen: {
        fontWeight: '300',
        fontSize: 14,
        textAlign: 'center',
        color: '#f48120',
        paddingTop: 5
    },
    sectionInputInline: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    titleDescription: {
        fontWeight: '100',
        fontSize: 14,
        textAlign: 'center',
        color: '#005b92',
        paddingTop: 5,
        fontStyle: 'italic'
    },
    contentWrapper: {
        paddingTop: 10,
        paddingHorizontal: 10
    },
    subLabel: {
        fontSize: 14,
        fontStyle: 'italic',
        fontWeight: '600'
    },
    imageApartment: {
        width: width - 50,
        height: ((width - 50) / 337) * 367
    },
    titleModal: {
        backgroundColor: '#F58319',
        height: 50,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        justifyContent: 'center'
    },
    textTitleModal: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 18,
        fontWeight: '600'
    },
    contentModal: {
        padding: 10,
        backgroundColor: '#fff',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15
    },
    btnSubmitModal: {
        width: (width - 100) / 2,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#f48120',
        marginHorizontal: 5,
        justifyContent: 'center'
    },
    btnCancelModal: {
        width: (width - 100) / 2,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#1f7eb8',
        marginHorizontal: 5,
        justifyContent: 'center'
    },
    titleNoIcon: {
        fontWeight: '600',
        fontSize: 16
    },
    //detail project
    titleSection: {
        fontWeight: '400',
        fontSize: 16,
        color: '#1f7eb8',
        paddingBottom: 5,
        paddingTop: 5
    },
    titleScreenLeft: {
        fontWeight: '400',
        fontSize: 18,
        color: '#1f7eb8',
        paddingBottom: 5
    },
    iconText: {
        fontSize: 12,
        color: 'orange'
    },
    textDescription: {
        fontSize: 12,
        marginTop: 4,
        paddingLeft: 5
    },
    basicInfoProject: {
        flexDirection: 'row',
        height: 80,
        borderWidth: 1,
        borderColor: '#cecece',
        borderRadius: 5,
        marginTop: 10
    },
    leftInfoProject: {
        height: 75,
        width: (width - 20) / 4,
        borderRightWidth: 1,
        borderRightColor: '#cecece',
        justifyContent: 'center'
    },
    centerInfoProject: {
        height: 75,
        width: (width - 20) / 2,
        justifyContent: 'center'
    },
    rightInfoProject: {
        height: 75,
        width: (width - 20) / 4,
        borderLeftWidth: 1,
        borderLeftColor: '#cecece',
        justifyContent: 'center'
    },
    numberBasicInfo: {
        fontWeight: '400',
        color: '#333333',
        textAlign: 'center'
    },
    textBasicInfo: {
        fontSize: 8,
        color: '#333333',
        textAlign: 'center'
    },
    imgThumbProject: {
        width: (width - 20) / 3,
        height: 110,
        marginRight: 5
    },
    bodyList: {
        margin: 0,
        height: 100
    },
    imgList: {
        height: 60,
        borderRadius: 5
    },
    itemList: {
        marginLeft: 0,
        width: '100%'
    },
    bigBtnIcon: {
        height: 40,
        width: '100%',
        borderRadius: 20,
        backgroundColor: '#187EB9',
        justifyContent: 'center',
        flexDirection: 'row',
        marginVertical: 10,
    },
    bigBtnBackIcon: {
        height: 40,
        width: '100%',
        borderRadius: 20,
        backgroundColor: 'gray',
        justifyContent: 'center',
        flexDirection: 'row',
        marginVertical: 10,
    },
    textBtnIcon: {
        color: 'white',
        fontWeight: '600',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 10
    },
    iconBigBtn: {
        fontSize: 14,
        color: 'white',
        marginTop: 13,
        marginRight: 5
    },
    //contact form
    textInput: {
        fontSize: 12,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#cecece',
        backgroundColor: 'white',
        paddingLeft: 5,
        marginTop: 5,
        height: 40
    },
    leftInputContact: {
        borderColor: '#cecece',
        borderWidth: 1,
        height: 40,
        borderRadius: 20,
        width: width / 2.2,
        marginLeft: 0
    },
    rightInputContact: {
        borderColor: '#cecece',
        borderWidth: 1,
        height: 40,
        borderRadius: 20,
        width: width / 2.2,
        right: 0
    },
    rightSectionInputContact: {
        position: 'absolute',
        right: 0,
        marginTop: 10
    },
    textAreaContact: {
        borderColor: '#cecece',
        borderRadius: 20,
        fontSize: 10
    },
    subTitle: {
        fontSize: 14,
        fontStyle: 'italic'
    },
    //tab project
    scrollTabProject: {
        backgroundColor: '#cacaca',
        height: 40
    },
    tabProject: { backgroundColor: '#fff' },
    textTabProject: {
        color: '#666',
        fontSize: 12
    },
    activeTab: { backgroundColor: '#F58319' },
    textActiveTab: {
        color: 'white',
        fontWeight: '600',
        fontSize: 12
    },
    slideProject: { height: height / 4 },
    btnSubmitSquareInline: {
        width: '48%',
        height: 40,
        borderRadius: 20,
        backgroundColor: '#177dba',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    btnDeleteSquareInline: {
        width: '48%',
        height: 40,
        borderRadius: 20,
        backgroundColor: 'red',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    btnBackSquareInline: {
        width: '48%',
        height: 40,
        borderRadius: 20,
        backgroundColor: 'gray',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    btnSpecial: {
        width: '48%',
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f48120',
        marginHorizontal: 5,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    btnGrayInline: {
        width: '48%',
        height: 40,
        borderRadius: 20,
        backgroundColor: '#d7d7d7',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    groupInline: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10
    },
    groupBoCongThuong: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 20
    },
    viewInput: {
        height: 40,
        width: '100%',
        borderRadius: 20,
        marginTop: 10,
        backgroundColor: '#fff',
        borderColor: '#cecece',
        borderWidth: 1
    },
    input: {
        height: 40,
        width: '100%',
        marginLeft: 15
    },
    viewHalfInput: {
        height: 40,
        width: '48%',
        borderRadius: 20,
        marginTop: 10,
        backgroundColor: '#fff',
        borderColor: '#cecece',
        borderWidth: 1
    },
    btnBtnIconSpecial: {
        height: 40,
        width: '100%',
        borderRadius: 20,
        backgroundColor: '#f48120',
        justifyContent: 'center',
        flexDirection: 'row',
        marginVertical: 10,
    },
    loginContainer: {
        padding: 20,
        flex: 1
    },
    textBtnIconFacebook: {
        color: '#4e64ad',
        fontWeight: '300',
        fontSize: 12,
        textAlign: 'center',
        marginTop: 10
    },
    textBtnIconGoogle: {
        color: '#dd4b39',
        fontWeight: '300',
        fontSize: 12,
        textAlign: 'center',
        marginTop: 10
    },
    iconBigBtnFacebook: {
        fontSize: 12,
        color: '#4e64ad',
        marginTop: 13,
        marginRight: 5
    },
    iconBigBtnGoogle: {
        fontSize: 12,
        color: '#dd4b39',
        marginTop: 13,
        marginRight: 5
    },
});
