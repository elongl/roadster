import { injectGlobal } from 'react-emotion';
injectGlobal(`
html, body {
    background: #D31027;
    background: -webkit-linear-gradient(to right, #EA384D, #D31027);
    background: linear-gradient(to right, #EA384D, #D31027);    
}

@media only screen and (min-width: 600px) {
    html, body {
        font-size: 35px;
    }
}
@media only screen and (min-width: 1100px) {
    html, body {
        font-size: 45px;
    }
}

.fade {
    &-enter,
    &-exit {
        transition: opacity 300ms linear;
    }
    &-enter {
        opacity: 0;
        &-active {
            opacity: 1;
        }
    }
    &-exit {
        opacity: 1;
        &-active {
            opacity: 0;
        }
    }
}
`);
