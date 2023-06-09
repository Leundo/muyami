import Muya from '@'
import EmojiPicker from '@/ui/emojiPicker'
import FormatPicker from '@/ui/formatPicker'
import ImageSelector from '@/ui/imageSelector'
import ImageToolBar from '@/ui/imageToolbar'
import ImageTransformer from '@/ui/transformer'
import CodePicker from '@/ui/codePicker'
import QuickInsert from '@/ui/quickInsert'
import TableTools from '@/ui/tableTools'

import FrontMenu from '@/ui/frontMenu'

const DEFAULT_STATE = [
    {
        name: 'diagram',
        text: 'A->B: Does something',
        meta: {
            lang: 'yaml',
            type: 'sequence'
        }
    },
    {
        name: 'diagram',
        text: `flowchart TD
    A[Hard] -->|Text| B(Round)
    B --> C{Decision}
    C -->|One| D[Result 1]
    C -->|Two| E[Result 2]`,
        meta: {
            lang: 'yaml',
            type: 'mermaid'
        }
    },
    // Indented code blocks and Fenced code blocks
    {
        name: 'code-block',
        meta: {
            type: 'indented', // indented or fenced
            lang: 'javascript' // lang will be enpty string if block is indented block. set language will auto change into fenced code block.
        },
        text: 'const foo = `bar`'
    },
    {
        name: 'paragraph',
        text: 'foo bar'
    },
    {
        name: 'math-block',
        text: 'a \\ne b',
        meta: {
            mathStyle: ''
        }
    },
    {
        name: 'html-block',
        text: '<div>\nfoo bar\n</div>'
    },
    // Table
    {
        name: 'table',
        children: [
            {
                name: 'table.row',
                children: [
                    {
                        name: 'table.cell',
                        meta: {
                            align: 'right' // none left center right, cells in the same column has the same alignment.
                        },
                        text: 'foo'
                    },
                    {
                        name: 'table.cell',
                        meta: {
                            align: 'none' // none left center right, cells in the same column has the same alignment.
                        },
                        text: 'bar'
                    }
                ]
            },
            {
                name: 'table.row',
                children: [
                    {
                        name: 'table.cell',
                        meta: {
                            align: 'right' // none left center right, cells in the same column has the same alignment.
                        },
                        text: 'zar'
                    },
                    {
                        name: 'table.cell',
                        meta: {
                            align: 'none' // none left center right, cells in the same column has the same alignment.
                        },
                        text: 'foo bar'
                    }
                ]
            }
        ]
    },
    // Indented code blocks and Fenced code blocks
    // Order List Blocks
    {
        name: 'order-list',
        meta: {
            start: 0, // 0 ~ 999999999
            loose: true, // true or false, true is loose list and false is tight.
            delimiter: '.' // . or )
        },
        children: [
            // List Item
            {
                name: 'list-item', // Can contains any type and number of leaf blocks.
                children: [
                    {
                        name: 'paragraph',
                        text: 'foo\nbar'
                    }
                ]
            }
        ]
    },
    // Bullet List Blocks
    {
        name: 'bullet-list',
        meta: {
            marker: '-', // - + *
            loose: false // true or false
        },
        children: [
            // List Item
            {
                name: 'list-item', // Can contains any type and number of leaf blocks.
                children: [
                    {
                        name: 'paragraph',
                        text: 'foo bar1'
                    },
                    {
                        name: 'paragraph',
                        text: 'foo bar2'
                    }
                ]
            }
        ]
    },
    // Task List
    {
        name: 'task-list',
        meta: {
            marker: '-' // - + *
        },
        children: [
            {
                name: 'task-list-item',
                meta: {
                    checked: false // true or false
                },
                children: [
                    {
                        name: 'paragraph',
                        text: 'a'
                    }
                ]
            },
            {
                name: 'task-list-item',
                meta: {
                    checked: true // true or false
                },
                children: [
                    {
                        name: 'paragraph',
                        text: 'b'
                    }
                ]
            },
            {
                name: 'task-list-item',
                meta: {
                    checked: false // true or false
                },
                children: [
                    {
                        name: 'paragraph',
                        text: 'c'
                    }
                ]
            },
            {
                name: 'task-list-item',
                meta: {
                    checked: false // true or false
                },
                children: [
                    {
                        name: 'paragraph',
                        text: 'd'
                    }
                ]
            }
        ]
    },
    {
        name: 'paragraph',
        text: '**blod** *emphasis* :man: <u>underline</u> <mark>highlight</mark> `inline code`~~删除~~ [百度](http://www.baidu.com) http://google.com'
    },
    // Thematic breaks
    {
        name: 'thematic-break',
        text: '---' // --- or ___ or ***
    },
    {
        name: 'atx-heading',
        meta: {
            level: 1 // 1 ~ 6
        },
        text: '# foo bar' // can not contain `\n`!
    },
    // Setext headings
    {
        name: 'setext-heading',
        meta: {
            level: 1,
            underline: '===' // === or ---
        },
        text: 'foo\nbar' // can contain multiple lines.
    },
    // Block quotes
    {
        name: 'block-quote',
        children: [
            {
                // Can contains any type and number of leaf blocks.
                name: 'paragraph',
                text: 'foo\nbar'
            }
        ]
    },
    {
        name: 'paragraph',
        text: 'Image![](https://s1.ax1x.com/2022/05/16/OWOAaR.jpg) bar &gt; *zar* <ruby>北京<rt>Beijing</rt></ruby> foo bar $a \\ne b$ 和自己'
    }
]

const DEFAULT_MARKDOWN = `
foo bar^hello^~world~

<div>
foo bar
</div>

| foo | bar     |
| ---:| ------- |
| zar | foo bar |

0. foo
   bar

- foo bar1

  foo bar2

- [ ] a
- [x] b
- [ ] c
- [ ] d

**blod** *emphasis* :man: <u>underline</u> <mark>highlight</mark> \`inline code\`~~Delete~~ [Baidu](http://www.baidu.com) http://google.com

---

# \`foo\` bar

foo
bar
===

> foo
> bar

图片![](https://s1.ax1x.com/2022/05/16/OWOAaR.jpg) bar &gt; *zar* <ruby>北京<rt>Beijing</rt></ruby> foo bar $a \ne b$ 和自己
`

Muya.use(EmojiPicker)
Muya.use(FormatPicker)
Muya.use(ImageSelector, {
    unsplashAccessKey: null
})
Muya.use(ImageToolBar)
Muya.use(ImageTransformer)
Muya.use(CodePicker)

Muya.use(FrontMenu)
Muya.use(QuickInsert)
Muya.use(TableTools)

const container = document.querySelector('#editor')
const undoBtn = document.querySelector('#undo')
const redoBtn = document.querySelector('#redo')
const searchInput = document.querySelector('#search')
const previousBtn = document.querySelector('#previous')
const nextBtn = document.querySelector('#next')
const replaceInput = document.querySelector('#replace')
const singleBtn = document.querySelector('#single')
const allBtn = document.querySelector('#all')
// const muya = new Muya(container, { json: DEFAULT_STATE, disableHtml: false })
const muya = new Muya(container, { markdown: DEFAULT_MARKDOWN, disableHtml: false })

window.muya = muya

muya.init()

undoBtn.addEventListener('click', () => {
    muya.undo()
})

redoBtn.addEventListener('click', () => {
    muya.redo()
})

searchInput.addEventListener('input', (event) => {
    const value = event.target.value

    muya.search(value, { isRegexp: true })
})

previousBtn.addEventListener('click', () => {
    muya.find('previous')
})

nextBtn.addEventListener('click', () => {
    muya.find('next')
})

singleBtn.addEventListener('click', () => {
    muya.replace(replaceInput.value, { isSingle: true, isRegexp: true })
})

allBtn.addEventListener('click', () => {
    muya.replace(replaceInput.value, { isSingle: false })
})

muya.on('json-change', (changes) => {
    // console.log(JSON.stringify(muya.getState(), null, 2))
    // console.log(muya.getMarkdown())
    // console.log(JSON.stringify(changes, null, 2))
})

muya.on('selection-change', changes => {
    const { anchor, focus, path } = changes
})
