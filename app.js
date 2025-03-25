// 法语到中文谐音映射字典
const frenchToChineseMap = {
    // 元音
    "a": "阿", "â": "阿", "à": "阿", 
    "e": "厄", "é": "埃", "è": "艾", "ê": "艾", "ë": "厄",
    "i": "伊", "î": "伊", "ï": "伊",
    "o": "哦", "ô": "哦", 
    "u": "于", "û": "于", "ù": "于", "ü": "于",
    
    // 鼻音
    "an": "昂", "am": "昂", "en": "昂", "em": "昂",
    "in": "安", "im": "安", "ain": "安", "aim": "安",
    "on": "翁", "om": "翁", 
    "un": "晕", "um": "晕",
    
    // 辅音
    "b": "布", "c": "克", "ç": "斯", "d": "德", 
    "f": "弗", "g": "格", "h": "", "j": "日",
    "k": "克", "l": "勒", "m": "姆", "n": "恩",
    "p": "普", "q": "克", "r": "赫", "s": "斯",
    "t": "特", "v": "夫", "w": "瓦", "x": "克斯",
    "y": "伊", "z": "兹",
    
    // 常见组合
    "ch": "什", "gn": "尼", "ll": "尔", "ph": "弗",
    "qu": "克", "th": "特",
    
    // 特殊单词(可扩展)
    "bonjour": "笨如儿", "merci": "麦赫西", "au revoir": "奥赫乌瓦赫",
    "je t'aime": "热带么", "paris": "巴黎"
};

// 转换函数
function convertToChinese(frenchText) {
    let result = frenchText.toLowerCase();
    
    // 先处理特殊词组(从长到短排序)
    const specialPhrases = Object.entries(frenchToChineseMap)
        .filter(([fr]) => fr.length > 1)
        .sort((a, b) => b[0].length - a[0].length);
    
    for (const [fr, zh] of specialPhrases) {
        const regex = new RegExp(fr, 'g');
        result = result.replace(regex, zh);
    }
    
    // 处理单个字符
    for (const [fr, zh] of Object.entries(frenchToChineseMap)) {
        if (fr.length === 1) {
            const regex = new RegExp(fr, 'g');
            result = result.replace(regex, zh);
        }
    }
    
    return result;
}

// 朗读函数
function speakFrench(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'fr-FR';
        window.speechSynthesis.speak(utterance);
    } else {
        alert('您的浏览器不支持语音合成功能');
    }
}

// 获取DOM元素
const frenchInput = document.getElementById('frenchInput');
const convertBtn = document.getElementById('convertBtn');
const speakBtn = document.getElementById('speakBtn');
const chineseOutput = document.getElementById('chineseOutput');

// 添加事件监听器
convertBtn.addEventListener('click', () => {
    const frenchText = frenchInput.value.trim();
    if (frenchText) {
        const chinesePhonetic = convertToChinese(frenchText);
        chineseOutput.textContent = chinesePhonetic;
    } else {
        alert('请输入法语文本');
    }
});

speakBtn.addEventListener('click', () => {
    const frenchText = frenchInput.value.trim();
    if (frenchText) {
        speakFrench(frenchText);
    } else {
        alert('请输入法语文本');
    }
});