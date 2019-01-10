import React, { Component } from 'react';
import {
    Container,
    Content,
    Body,
    DeckSwiper,
    Card,
    CardItem
} from 'native-base';
import Header from './../Home/Header';
import { loading } from '../../../Helpers';
import {
    Dimensions,
    Image,
    View,
    Text
} from "react-native";
import imgQuestion from './../../../images/privacy.png';

const cards = [
    {
        image: imgQuestion,
    }
];

const {
    width,
} = Dimensions.get('window');
export default class Privacy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ loaded: true });
        }, 200);
    }

    render() {
        if (!this.state.loaded) {
            return loading();
        }
        return (
            <Container>
                <Header navigation={this.props.navigation} title='ĐIỀU KHOẢN DỊCH VỤ' back={'MapScreen'} />
                <View style={{ height: (width / 889) * 333 }}>
                    <DeckSwiper
                        dataSource={cards}
                        renderItem={item =>
                            <Card style={{ elevation: 3 }}>
                                <CardItem cardBody>
                                    <Image
                                        style={{ width: '100%', height: (width / 889) * 333 }}
                                        source={item.image}
                                    />
                                </CardItem>
                            </Card>
                        }
                    />
                </View>
                <Content>
                    <Card>
                        <CardItem header>
                            <Text>Những vấn đề pháp lý về hợp đồng mua bán căn hộ chung cư
                                Bao gồm những vấn đề pháp lý xoay quanh: chủ thể của hợp đồng, nội dung của hợp đồng,
                                hình thức của hợp đồng.</Text>
                        </CardItem>
                        <CardItem>
                            <Body>
                            <Text>
                                1. Chủ thể của hợp đồng mua bán căn hộ chung cư
                                Các chủ thể tham gia hợp đồng mua bán căn hộ nhà chung cư rất đa dạng, họ là những người
                                có nhu cầu về chuyển dịch quyền sở hữu đối với căn hộ nhà chung cư. Các chủ thể này có
                                thể là cá nhân, tổ chức trong nước hoặc nước ngoài. Khi tham gia vào quan hệ hợp đồng họ
                                cần đáp ứng đủ các điều kiện về năng lực chủ thể.

                                Cá nhân khi tham gia vào hợp đồng mua bán căn hộ chung cư cần có năng lực pháp luật và
                                năng lực hành vi dân sự đầy đủ. Về nguyên tắc, mọi cá nhân đều bình đẳng về năng lực
                                pháp luật với nhau, tuy nhiên đối với mỗi cá nhân khác nhau thì năng lực pháp luật có
                                thể bị hạn chế khác nhau. Ví dụ như, người nước ngoài ở Việt Nam muốn mua căn hộ nhà
                                chung cư thì chỉ được mua và sở hữu căn hộ chung cư khi là người có công đóng góp với
                                Việt Nam, người kết hôn với công dân Việt Nam, có thời hạn cư trú tại Việt Nam trên 1
                                năm….,và chỉ được sở hữu 1 căn hộ chung cư tại thời điểm cư trú với mục đích để ở, không
                                phải cho thuê hoặc sử dụng với mục đích khác… Đối với người có năng lực hành vi dân sự
                                bị hạn chế, người không có năng lực hành vi dân sự, người mất năng lực hành vi dân sự
                                thì theo qui định của pháp luật khi tham gia giao kết hợp đồng phải thông qua người đại
                                diện hợp pháp. Việc qui định này đảm bảo cho việc giao kết hợp đồng của các chủ thể là
                                hoàn toàn tự nguyện, bình đẳng, trung thực, cũng như họ có thể thực hiện được các nghĩa
                                vụ pháp lý phát sinh từ hợp đồng.

                                Đối với chủ thể là tổ chức, thì muốn tham gia vào hợp đồng cần có tư cách pháp nhân.
                                Năng lực chủ thể của pháp nhân bao gồm năng lực pháp luật và năng lực hành vi. Hai loại
                                năng lực này phát sinh đồng thời tại thời điểm thành lập pháp nhân và tồn tại tới khi
                                pháp nhân chấm dứt hoạt động. Năng lực chủ thể của pháp nhân phải phù hợp với mục đích
                                và lĩnh vực hoạt động của pháp nhân đó, do vậy, các pháp nhân khác nhau sẽ có năng lực
                                chủ thể khác nhau. Theo qui định của pháp luật thì: tổ chức, cá nhân kinh doanh bất động
                                sản phải thành lập doanh nghiệp hoặc hợp tác xã, phải có vốn pháp định và phải đăng kí
                                kinh doanh bất động sản theo qui định của pháp luật ví dụ như vốn để thực hiện dự án
                                không được thấp hơn 15% tổng mức đầu tư đối với dự án có qui mô sử dụng đất dưới 20ha và
                                không thấp hơn 20% tổng mức đầu tư của dự án có qui mô từ 20ha trở lên được phê duyệt.

                                Các loại chủ thể được chia ra 2 loại là chủ thể bán và chủ thể mua căn hộ nhà chung cư.
                                Chủ thể bán có thể là nhà nước, chủ sở hữu nhà chung cư là cá nhân, tổ chức trong nước
                                hoặc nước ngoài, chủ sở hữu căn hộ nhà chung cư là cá nhân hay tổ chức trong nước hoặc
                                nước ngoài hoặc các chủ thể khác. Chủ thể mua có thể là cá nhân, hộ gia đình mua căn hộ
                                chung cư để tạo lập nơi ở, là tổ chức, cá nhân người nước ngoài, là đồng sở hữu đối với
                                căn hộ chung cư thuộc sở hữu chung, người mua căn hộ chung cư theo phương thức trả chậm
                                trả dần, người mua căn hộ chung cư qua hợp đồng thuê mua…

                                2. Nội dung của hợp đồng
                                2.1 Đối tượng của hợp đồng mua bán căn hộ chung cư
                                Căn hộ chung cư là đối tượng của hợp đồng mua bán khi nó thuộc quyền sở hữu của bên bán,
                                căn hộ chung cư được xác định bởi cấu trúc xây dựng, chất lượng xây dựng, diện tích sàn
                                hay diện tích sử dụng của căn hộ trên một vị trí nhất định. Căn hộ nhà chung cư muốn trở
                                thành đối tượng của hợp đồng cần có giấy chứng nhận quyền sở hữu nhà của chủ sở hữu.
                                Giấy chứng nhận quyền sở hữu nhà ở đối với căn hộ chung cư là văn bản xác lập quyền sở
                                hữu của chủ sở hữu đối với nhà nước. Theo qui định của pháp luật hiện hành thì trong
                                thời hạn 30 ngày kể từ ngày các chủ sở hữu căn hộ và chủ sở hữu phần riêng hoàn thành
                                việc thanh toán tiền mua theo hợp đồng mua bán, tổ chức kinh doanh nhà ở phải hoàn thành
                                và nộp cho cơ quan cấp giấy chứng nhận quyền sở hữu nhà ở hồ sơ từng căn hộ cùng giấy tờ
                                kèm theo như quy định. Các cơ quan này có trách nhiệm hoàn thành thur tục cấp giấy chứng
                                nhận quyền sở hữu nhà ở cho chủ sở hữu căn hộ trong vòng 30 ngày kể từ ngày nhận đủ hồ
                                sơ hợp lệ. Cũng theo thông tư này thì hồ sơ của từng căn hộ phải có bản sao xác nhận của
                                sàn giao dịch bất động sản về việc căn hộ đã được giao dịch qua sàn đối với các giao
                                dịch mua bán căn hộ chung cư kể từ ngày 10/4/2009.

                                Đối với căn hộ chung cư là tài sản hình thành trong tương lai, thì cần phải có căn cứ
                                xác định rõ ràng. Theo điều 429 Bộ luật Dân sự 2005:

                                “Đối tượng của hợp đồng mua bán là tài sản được phép giao dịch. Trong trường hợp đối
                                tượng của hợp đồng mua bán là quyền tài sản thì phải có giấy tờ hoặc các bằng chứng
                                khác, chứng minh quyền đó thuộc sở hữu của bên bán”.

                                Như vậy pháp luật Dân sự cho phép các chủ thể giao kết hợp đồng mua bán với các đối
                                tượng hiện có hoặc chưa có trong thời điểm giao kết, miễn là đối tượng này được xác định
                                rõ ràng. Căn hộ chung cư dự án theo đó có thể là đối tượng của hợp đồng mua bán nếu nó
                                được xác định rõ ràng và cụ thể về vị trí, diện tích, cấu trúc… Theo qui định của Luật
                                Nhà ở thì chủ đầu tư cũng có quyền huy động vốn từ nguồn tiền ứng trước của người có nhu
                                cầu mua căn hộ chung cư khi dự án đã thiết kế xây dựng đã được phê duyệt và đã được xây
                                dựng xong phần móng. Ngoài ra, căn hộ chung cư còn cần đáp ứng các điều kiện như không
                                có tranh chấp về quyền sở hữu, không bị kê biên thi hành án hoặc chấp hành quyết định
                                hành chính của cơ quan nhà nước có thẩm quyền; nếu là căn hộ được đưa vào kinh doanh thì
                                phải là căn hộ được phép kinh doanh, đảm bảo các yêu cầu về kĩ thuật và không nằm trong
                                khu vực cấm xây dựng theo pháp luật.

                                2.2 Giá cả và phương thức thanh toán
                                Khi giao kết hợp đồng, các bên có thể tự do thỏa thuận về giá cũng như phương thức thanh
                                toán. Luật Nhà ở có phép các chủ đầu tư được huy động vốn khách hàng có nhu cầu mua căn
                                hộ chung cư khi nhà ở được xây dựng xong phần móng, các chủ đầu tư được huy động vốn góp
                                dưới hình thức này nhưng không được quá 70% giá trị của căn hộ chung cư ghi trong hợp
                                đồng.

                                Các bên trong hợp đồng mua bán có thể tự do thỏa thuận là trả tiền 1 lần hay nhiều lần,
                                theo phương thức trả chậm trả dần hay theo thuê mua; tiền mua có thể được trả theo nhiều
                                hình thức như bằng tiền mặt, chuyển khoản…các bên cũng được quyền lựa chọn bên thứ 3 để
                                xác định giá mua bán. Đối với căn hộ chung cư được nhận ưu đãi của nhà nước phục vụ cho
                                các chính sách thì nhà nước quy định khung giá hoặc nguyên tắc hình thành giá.

                                nhung-van-de-phap-ly-ve-hop-dong-mua-ban-can-ho-chung-cu%282%29

                                >>> Luật sư tư vấn pháp luật trực tuyến qua tổng đài: 1900.6568

                                2.3 Quyền và nghĩa vụ của các bên
                                * Quyền và nghĩa vụ của bên bán:

                                Bên bán có quyền yêu cầu bên mua thanh toán đủ tiền theo thơi hạn và phương thức đã được
                                thỏa thuận trong hợp đồng, yêu cầu bên mua bồi thường thiệt hại do lỗi của bên mua gây
                                ra, đơn phương chấm dứt hợp đồng hay hủy bỏ hợp đồng trong trường hợp 2 bên thỏa thuận
                                hoặc theo qui định của pháp luật

                                Bên bán có nghãi vụ cung cấp thông tin đầy đủ và trung thực về căn hộ chung cư và chịu
                                trách nhiệm về thông tin đã cung cấp, trường hợp bên bán không thông báo mà bên mua phát
                                hiện ra thì bên mua có quyền hủy hợp đồng; giao căn hộ chung cư theo đúng tiến độ, chất
                                lượng và các điều kiện đã thỏa thuận kem theo hồ sơ và các giấy tờ hướng dẫn sử dụng
                                khác; bảo hành căn hộ chung cư đã bán theo thỏa thuận của 2 bên, không ít hơn 60 tháng
                                đối với nhà chung cư 9 tầng trở lên, không ít hơn 36 tháng đối với nhà chung cư từ 4 đến
                                8 tầng và không ít hơn 24 tháng đối với các nhà chung cư còn lại. bên bán có nghĩa vụ
                                bồi thường thiệt hại do lỗi của mình gây ra, thực hiện nghĩa vụ về thuế theo qui định
                                của pháp luật. Duy trì hoạt động bình thường của căn hộ chung cư, dảm bảo khai thác tốt
                                các tính năng của nhà chung cư.

                                * Quyền và nghĩa vụ của bên mua

                                Bên mua có quyền được nhận căn hộ chung cư kèm theo giấy chứng nhận quyền sở hữu nhà ở
                                và các giấy tờ liên quan; yêu cầu bên bán hoàn thành các thủ tục mua bán, chuyển giao
                                quyền sở hữu và có trách nhiệm bảo hành đối với căn hộ chung cư. Yêu cầu bên bán bồi
                                thường thiệt hại do việc bàn giao căn hộ chung cư không đúng thời hạn, chất lượng hoặc
                                không đúng cam kết trong hợp đồng; đơn phương chấm dứt hợp đồng theo thảo thuận của 2
                                bên hoặc do pháp luật quy định.

                                Bên mua có nghĩa vụ thanh toán tiền đúng thời hạn theo phương thức đã thỏa thuận, nhận
                                căn hộ chung cư kèm theo đầy đủ giấy tờ và hồ sơ theo đúng chất lượng thời hạn thỏa
                                thuận trong hợp đồng, sử dụng căn hộ theo đúng công năng thiết kế, trong trường hợp mua
                                căn hộ cho thuê thì phải đảm bào quyền, lợi ích của người thuê trong thời gian hợp đồng
                                thuê vẫn còn hiệu lực

                                3. Hình thức hợp đồng
                                Theo quy định tại điều 450 Bộ luật Dân sự 2005 quy định về hình thức của hợp đồng mua
                                bán nhà ở thì:

                                “Hợp đồng mua bán nhà ở phải được lập thành văn bản có chứng thực hoặc chứng nhận trừ
                                trường hợp pháp luật có qui định khác”.

                                Vì căn hộ chung cư là loại tài sản có đăng ký quyền sở hữu nên hợp đồng mua bán phải
                                được lập thành văn bản và có công chứng và chứng thực, các bên phải tiến hành thủ tục
                                này khi giao kết, việc vi phạm có thể dẫn đến trường hợp hợp đồng sẽ bị tuyên vô hiệu.
                                Hiện nay,có rất nhiều hợp đồng mà đối tượng là các căn hộ chung cư dự án. Các hợp đồng
                                này thường được ký kết dưới dạng hợp đồng góp vốn hay hợp đồng hứa mua, hứa bán. Tuy
                                nhiên lại chưa có sự quy định của pháp luật về loại hợp đồng này. Theo tinh thần của
                                Luật Nhà ở 2005 tại điều 38 thì vẫn coi hợp đồng này là một dạng của hợp đồng mua bán
                                nhà ở còn theo qui định của Bộ luật Dân sự 2005 thì hợp đồng mua bán căn hộ chung cư dự
                                án là hợp đồng mua bán tài sản hình thành trong tương lai. Và vì vậy không căn cứ hay
                                bắt buộc các hợp đồng dạng này phải có công chứng, chứng thực, điều này đã ảnh hưởng rất
                                lớn đến hiệu lực của hợp đồng cũng như quyền lợi của các bên tham gia.

                                Hiệu lực của hợp đồng được quy định trong từng loại hợp đồng.Với hợp đồng miệng, hiệu
                                lực của hợp đồng bắt đầu từ thời điểm giao kết, là thời điểm các bên đã thực hiện thỏa
                                thuận với nhua về nội dung của hợp đồng. đối với hợp đồng bằng văn bản, thông thường
                                thời điểm giao kết là thời điểm bên sau cùng ký vào văn bản hợp đồng. thời điểm có hiệu
                                lực của hợp đồng có thể do các bên thỏa thuận. còn đối với hợp đồng mua bán căn hộ chung
                                cư có hiệu lực khi các bên tiến hành giao kết và được cơ quan công chứng chứng nhận hoặc
                                Ủy ban nhân dân cấp có thẩm quyền chứng nhận.


                            </Text>
                            </Body>
                        </CardItem>
                        <CardItem footer>
                            <Text>VtechLand</Text>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}
