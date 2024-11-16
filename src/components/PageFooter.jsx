import React from 'react'

export default function PageFooter() {
    return (
        <div><p className="links">
            <span className="linkItem">友情链接：</span>
            <a
                href="https://onlyprobie.github.io"
                target="_blank"
                rel="noreferrer"
                className="linkItem"
            >
                韩海Tempest's Blog
            </a>
        </p>
            <p>© 2024 - Coder Station</p>
            <p>Powered by Create React App</p>
        </div>
    )
}
