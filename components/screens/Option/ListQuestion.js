import React, { Component } from 'react';
import {
    Dimensions,
    Image,
    View,
    Text
} from 'react-native';
import {
    Container,
    Content,
    Accordion,
    DeckSwiper,
    Card,
    CardItem
} from 'native-base';
import HTMLView from 'react-native-htmlview';
import Header from './../Home/Header';
import { loading } from '../../../Helpers';
import imgQuestion from './../../../images/faq.jpg';
import styles from "../../../styles";

const dataArray = [
    { title: "Nên mua chung cư hay nhà mặt đất?", content: "Khi bạn sống ở một căn hộ chung cư từ trung cấp đến cao cấp có hạ tầng tương đối đồng bộ, bạn sẽ được tận hưởng những tiện ích và dịch vụ hiện hữu mang lại. Đó là siêu thị, café, quán ăn, khu vui chơi trẻ em, công viên cây xanh, ngân hàng, trường học, nhà thuốc, bể bơi, phòng tập thể dục thẩm mỹ, sân đánh tenis, bóng đá, hồ cảnh quan. Ngoài ra, chưa kể cuộc sống sẽ trở nên an toàn tuyệt đối nhờ hệ thống an ninh hiện đại, bảo vệ 24/24, điều này sẽ không thể có được khi khách hàng mua bất động sản thổ cư, đặc biệt là những khu vực đất thổ cư nhiều làng xóm cũ, khu vực bất ổn hoặc nhiều trộm cắp, thành phần phức tạp.\n" +
            "\n" +
            "Với đất thổ cư, 1 tỷ bạn sẽ chỉ mua được 1 mảnh đất hay một căn nhà nhỏ khoảng 30m2 trong ngõ, không có chỗ để ô tô, thậm chí ngõ chỉ xe máy mới đi vào được. Điều đó sẽ khác biệt hoàn toàn với 1 căn hộ nhỏ xinh 2 phòng ngủ đầy đủ tiện ích, có chỗ đỗ xe an toàn, bạn không mất công trông giữ nhà cửa đề phòng trộm cắp, không phiền lòng khi dọn dẹp căn nhà chạy đi chạy lại nhiều cầu thang, không phải đi xem thầy hay lo lắng về thổ công thổ địa, về tiểu sử nhà này có ổn không hay mồ mả gì?\n" +
            "\n" +
            "Sự tiện ích, an toàn, hiện đại chính là những gì căn hộ chung cư có thể mang lại cho khách hàng." },
    { title: "Làm sao để tôi chọn ra dự án tốt nhất", content: "Để nhận ra đâu là dự án tốt nhất và hợp với mình nhất, khách hàng nên chia các yếu tố để đánh giá và cho điểm các dự án đó, sau đó chấm điểm rồi cộng lại chia ra điểm trung bình. Các yếu tố tiên quyết khi chấm điểm một dự án là: Giá bán, diện tích, thiết kế, tiện ích nội khu, tiện ích ngoại khu, vị trí dự án, chương trình bán hàng, thời gian bàn giao, lưu lượng giao thông, mật độ dân số, mật độ xây dựng, chất lượng thi công, uy tín chủ đầu tư, mật độ thang máy.\n" +
            "\n" +
            "Khi phân tích dự án, khách hàng nên chú ý thêm cả những yếu tố liên quan, trực tiếp đến cuộc sống của mình như: Có tiện đi lại không? Có ưu điểm vượt trội gì mà mình thích hơn không? Sau đó, dựa vào các phân tích suy ra lại số điểm trung bình để chắc chắn chọn ra cho mình căn hộ ưng ý nhất, mà cụ thể là: Vị trí: thuận lợi cho việc đi lại; Giá: phù hợp với tài chính gia đình, không vượt quá 50% số tiền hiện đang có; Môi trường sống: ảnh hưởng đến thói quen, tính cách, sở thích của con em chúng ta, nên cần để ý chọn lựa thật kỹ; View: hướng có gió và tránh ánh nắng trực tiếp (hướng Đông Nam và Đông Bắc); Chủ đầu tư: phải có uy tín, dự án mà họ đang làm có được ngân hàng bảo lãnh tiến độ xây dựng hay không? Nếu không thì bạn không nên đầu tư vào dự án này để tránh tiền mất, tật mang; Ngân hàng: ngân hàng có hỗ trợ cho mình được mua dự án này hay không?" },
    { title: "Tôi thích dự án này nhưng nó cách chỗ đi làm của tôi quá xa, tôi phải làm gì?", content: "Theo thống kê thành phố Hồ Chí Minh thì mỗi năm có hàng chục, hàng trăm nghìn người nhập cư. 1,5 tỷ là số tiền ít nhất mà bạn cần phải chuẩn bị trước khi lên kế hoạch mua một căn hộ chung cư trong trung tâm thành phố. Lý do đất ít mà người đông dẫn đến giá các dự án ở trung tâm thành phố ngày càng đắt đỏ và lan tỏa sang các khu vực rìa xung quanh trung tâm thành phố. Mặc dù đắt xắt ra miếng nhưng đa phần các dự án trong trung tâm tập trung vào các kiểu xây những block đơn lẻ chứ không đi kèm với các tiện ích xanh. Để bù với điểm bất lợi này thì các căn hộ như thế đều rất cao cấp, từ nội thất cho đến thiết kế.\n" +
            "\n" +
            "Mặt khác, nếu bạn cầm 1,5 tỷ của mình di chuyển ra các vùng đô thị mới, bạn sẽ vừa có thể sở hữu căn hộ thiết kế đẹp, khuôn viên sống thoáng đãng cộng với những tiện ích nội khu khá ổn. Nói đến khu đô thị mới tiềm năng mạnh nhất thì Thủ Đức, Quận 2 hay Quận 9 chính là lựa chọn khá hợp lý - hiện tại chính quyền thành phố đang đẩy mạnh nguồn lực phát triển các quận phía Đông của TP Hồ Chí Minh, trong tương lai các khu vực này sẽ trở thành một khu đô thị mới làm vệ tinh cho nội thành. Vì thế, khi mua chung cư, đầu tiên bạn hãy nghĩ xa về khả năng phát triển của những khu rìa trung tâm.\n" +
            "\n" +
            "Thế nhưng, kinh nghiệm chọn mua căn hộ chung cư thực tế cho thấy, các chuyên gia kinh doanh bất động sản khuyên rằng tốt nhất bạn đừng sống trong \"hộp\" mà hãy chọn những khu chung cư có khuôn viên sống bên trong thật rộng rãi và thoải mái. Số tiền mà bạn dành dụm để có thể mua được một căn nhà an cư là rất khó nên hãy chọn một nơi có công viên cây xanh bên trong, đủ tiện ích từ hồ bơi đến khu mua sắm, để cho gia đình bạn (đặc biệt khi có con) có thể thoải mái vui đùa cùng nhau sau một tuần làm việc và học tập vất vả." },
    { title: "Tôi thực sự ưng ý về dự án nhưng nó vượt quá sự chi chả, tôi nên làm như thế nào?", content: "Thực tế, các dự án khi đã bắt đầu chào bán, chủ đầu tư thường sẽ khảo sát mức giá & phân tích phân khúc khách hàng để đưa ra mức giá phù hợp với thị trường chung. Mức giá cũng có thể do các chương trình bán hàng hoặc phương án của chủ đầu tư trong từng giai đoạn. Người Việt từ trước đến nay đều có một tâm lý chung là luôn muốn “cố” một chút để đạt được những điều tốt nhất, với lựa chọn căn hộ cũng vậy, tại sao không cố một chút để sở hữu cho mình một căn hộ ưng ý? Thực tế, nếu dự án đắt hơn quá 20% so với khả năng tài chính của mình là khách hàng có thể cân đối mua được. Ví dụ mua căn 2 tỷ mà căn hộ lên đến 2,4 tỷ. Khách hàng nên suy nghĩ là 400 triệu trong thời gian 10 năm tới, tức là 120 tháng tới, mỗi tháng khách hàng nên tiết kiệm thêm 3,3 triệu, vậy mỗi ngày khách hàng tiết kiệm thêm 100.000 đồng là có thể cố gắng để mua thêm một căn nhà tốt cho mình. Chia nhỏ mục tiêu để cố gắng đạt đến nó cũng làm cho con số dễ thở hơn." },
    { title: "Tôi có nên vay ngân hàng để mua dự án?", content: "Hầu hết các dự án hiện nay đều dành cho khách hàng nhiều hỗ trợ, ưu đãi lớn từ ngân hàng, vì thế nếu cần vay thêm thì khách hàng nên vay. Tuy nhiên, khách hàng nên vay trong tầm khả năng chi trả của mình để đảm bảo an toàn. Tốt nhất nên hỏi kỹ ngân hàng phương án tài chính và các điều khoản để đảm bảo mình hiểu hết các vấn đề trước khi đặt bút ký. Rủi ro khi vay mua nhà trong tình hình kinh tế biến động là điều không tránh khỏi. Người mua nhà nên lưu ý ngoài quan tâm đến sự biến động của lãi suất thì cần phải tính toán cơ cấu tài chính của mình trước khi quyết định vay tiền ngân hàng mua nhà. Đầu tiên thu nhập phải tương ứng với sản phẩm, tức trả lời các câu hỏi với mức thu nhập tầm này thì nên mua sản phẩm nào. Và với mức tiền tích lũy đang có, nếu vay thời điểm hiện tại thì phải trả gốc và lãi hằng tháng là bao nhiêu?\n" +
            "\n" +
            "Rủi ro luôn tiềm ẩn, nhưng khi chúng ta cơ cấu được tài chính tốt thì rủi ro này sẽ được hạn chế. Chẳng hạn khi mua căn nhà 1 tỷ đồng, chúng ta vay 400-500 triệu đồng, hằng tháng phải trả 6 triệu đồng. Để trả được khoản nợ này nên tính toán thật kỹ thu nhập sau khi trừ hết chi tiêu hằng tháng phải còn lại 7 - 10 triệu đồng. Nên nhớ rủi ro không mất hẳn, mà điều quan trọng là quản lý rủi ro như thế nào." },
    { title: "Hết thời hạn sử dụng chung cư, căn hộ được xử lý như thế nào?", content: "Vấn đề này được giải quyết theo quy định tại Điều 87 và Khoản 3 Điều 89 Luật Nhà ở 2005 như sau:\n" +
            "\n" +
            "Chỗ ở của hộ gia đình, cá nhân khi nhà ở bị phá dỡ:\n" +
            "\n" +
            "1. Chủ sở hữu nhà ở phải tự lo chỗ ở cho mình khi nhà ở bị phá dỡ.\n" +
            "2. Phá dỡ nhà ở thuộc diện giải phóng mặt bằng thì chỗ ở của hộ gia đình, cá nhân được giải quyết theo chính sách về bồi thường, hỗ trợ và tái định cư khi Nhà nước thu hồi đất nhưng phải bảo đảm nguyên tắc chỗ ở mới của hộ gia đình, cá nhân phải bằng hoặc tốt hơn chỗ ở cũ.\n" +
            "\n" +
            "Điều 89. Phá dỡ nhà ở theo nhu cầu của chủ sở hữu nhà ở:\n" +
            "\n" +
            "3. Trường hợp phá dỡ nhà chung cư để xây dựng lại thì phải có dự án được cơ quan nhà nước có thẩm quyền phê duyệt, bảo đảm quyền được tái định cư và lợi ích chính đáng của các chủ sở hữu nhà chung cư theo quy định của pháp luật.\n" +
            "\n" +
            "Như vậy, quyền lợi của chủ sở hữu căn hộ được giải quyết theo chính sách bồi thường, hỗ trợ và tái định cư khi Nhà nước thu hồi đất.\n" +
            "\n" +
            "Nếu được hãy nhờ một môi giới có kinh nghiệm trong trường hợp bạn chưa có kinh nghiệm trong việc mua nhà. Trên thực tế rất nhiều người nói rằng họ chỉ mua nhà từ chính chủ để tránh mất thêm phí môi giới. Điều này thật tốt đối với những người đã có kinh nghiệm, tuy nhiên, với những người mua nhà lần đầu bạn có thể gặp chút rắc rối." },
];

const cards = [
    {
        image: imgQuestion,
    }
];

const {
    width,
} = Dimensions.get('window');
export default class ListQuestion extends Component {
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

    _renderContent(item) {
        return (
            <HTMLView
                value={item.content}
                paragraphBreak=''
                sylesheet={styles}
            />
        );
    }

    render() {
        if (!this.state.loaded) {
            return loading();
        }
        return (
            <Container>
                <Header
                    navigation={this.props.navigation}
                    title='CÂU HỎI THƯỜNG GẶP' back={'MapScreen'}
                />
                <View style={{ height: (width / 833) * 457 }}>
                    <DeckSwiper
                        dataSource={cards}
                        renderItem={item =>
                            <Card style={{ elevation: 3 }}>
                                <CardItem cardBody>
                                    <Image
                                        style={{ width: '100%', height: (width / 833) * 457 }}
                                        source={item.image}
                                    />
                                </CardItem>
                            </Card>
                        }
                    />
                </View>
                <Content>
                    <Accordion
                        dataArray={dataArray}
                        renderContent={this._renderContent}
                    />
                </Content>
            </Container>
        );
    }
}
