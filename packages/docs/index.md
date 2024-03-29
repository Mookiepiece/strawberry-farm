# Strawberry Farm

这是一个什锦工具箱。作为各种网页效果的参考。

`Shopify/dawn` 广泛运用 Web Components 让我思考能否脱离框架设计组件以解决通用问题。
Strawberry Farm 优先使用 CSS、DOM API、Web Components， 以实现不依赖于 Javascript 框架的更高的兼容性。

注意：Strawberry Farm 追求轻量，不仅有很多约定，这更意味着弱。

::: details Motivation

> However, as an application matures, development speed will inevitably slow down. On a poorly implemented product, development speed slows down quickly. But even on a beautifully implemented one, development speed still slows down over time. As the more code you add to an application, the slower development becomes, I view all code as technical debt.
>
> As developers, it’s tempting to think we’re creating value by writing code. However, the value of software comes from the usefulness of it to users, not the quality of our code. Poorly written code that does a useful task is more valuable than beautifully implemented code that does a useless one.
>
> -- Paul McMahon《All code is technical debt》
>
> 一个基本的事实是 代码越少，技术债越小；没有代码，就没有技术债。从这个角度看，软件开发的正确做法是下面两点。
>
> （1）冗余的代码都要删除。
>
> （2）只实现那些必须实现的功能，除非绝对必要，不要引入新功能。新功能必然带来新的代码，而且新功能一旦添加，就很难废除，总是会保留下来。
>
> https://www.ruanyifeng.com/blog/2024/03/weekly-issue-292.html

> W3C 规范的数量平均每年增长200个，约400万个单词。
>
> 我觉得，这使得构建一个新的浏览器已经不可能，没有人能够把这些规范都从头实现一遍。
>
> 现有的浏览器不应该再把重点放在添加新功能了，而应该专注于性能和稳定性的提高。
>
> -- 《网络浏览器鲁莽的无限范围》
>
> https://drewdevault.com/2020/03/18/Reckless-limitless-scope.html
>
> https://www.ruanyifeng.com/blog/2024/03/weekly-issue-291.html

> 但并非如此，公司里一部分人造着他们以为的好工具，一部分人不得不用着另一部分人造出的工具。而我的工作是更接近用户的一侧，显然属于不得不用的后者。决定工具走向的人却不是使用最多的人，而使用工具最多的人，每天疲于应付面向用户的业务开发，还要经常被上游工具的 BUG 绊倒，一踩便是一天。
>
> -- 云游君《云乐坊工作室的成立与缘起与有关的话》
>
> https://mp.weixin.qq.com/s/hMAH4xw58wAxO0AcZ1LZ7Q

> 有一种程序员，技术非常好，但创建的项目过于复杂，其他人很难完成。他们选择自己完成大部分工作，并将不太重要的任务交给其他人。当他们退出时，由于代码的复杂性和缺乏理解，团队陷入了巨大的困境。
>
> 有些人认为，这种程序员是大牛，但我认为他们实际上是很糟糕的，因为他们的工作不易被其他人接手或维护。
>
> -- Alexander Mikhailian《The Worst Kind of Programmer》
>
> https://www.ruanyifeng.com/blog/2024/03/weekly-issue-294.html

> 大家总是提倡，提高工作效率。但是很少有人谈，为什么要提提高工作效率。
>
> 我认为，真正的原因并不是，这样才能完成更多工作，或者获得更多时间，而是只有提高工作效率，你才能发挥自己最大的潜力。
>
> -- Mayank Verma 《Why Be Productive?》

:::
