//jsx的缺点是没有写style的方法，要拆分出去写
import '../assets/styles/footer.styl'

export default {
    //变量使用
    data() {
        return{
            author: 'JiangJoy'
        }
    },
    render() {
        return (
            <div id="footer">
                <span>Written by {this.author}</span>
            </div>
        )
    }
}