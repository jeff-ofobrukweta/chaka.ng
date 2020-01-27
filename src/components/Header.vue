<template>
    <header id="header" :class="{ 'header-search': isSearchOpened }">
        <nav class="nav" role="navigation" :class="{ nav__dashboard: isLoggedIn }">
            <template v-if="!isLoggedIn">
                <div class="nav-left">
                    <router-link
                        class="nav__logo"
                        :to="{ name: 'home' }"
                        exact-active-class="active"
                    >
                        <svg width="146" height="42" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <title>chaka</title>
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M21.797 23.508c-1.875-4.414-4.593-7.19-7.632-8.818 1.24-3.224 3.728-6.301 7.963-8.802 2.597 1.87 5.597 4.97 7.285 8.81-3.033 1.63-5.744 4.403-7.616 8.81zm-.592 2.247c-.725 2.864-1.024 6.265-.75 10.288C12.827 37.816-3.64 31.352.726 14.392c6.414-1.045 17.594.323 20.48 11.363zm.858 9.914c6.915 2.837 25.532-3.37 20.922-21.277-7.979-1.3-23.334 1.135-20.922 21.277z"
                                fill="#22A4EF"
                            />
                            <path
                                d="M52.665 25.314c0-1.372.213-2.648.638-3.83.426-1.206 1.029-2.246 1.809-3.12a8.551 8.551 0 0 1 2.908-2.058c1.134-.496 2.411-.744 3.83-.744 1.749 0 3.404.319 4.964.957l-.922 3.511a9.638 9.638 0 0 0-1.702-.532 8.822 8.822 0 0 0-1.986-.213c-1.678 0-2.955.532-3.83 1.596-.874 1.04-1.312 2.518-1.312 4.433 0 1.844.414 3.31 1.241 4.397.828 1.064 2.223 1.596 4.185 1.596.733 0 1.454-.071 2.163-.213.71-.142 1.324-.32 1.844-.532l.603 3.546c-.473.236-1.194.45-2.163.638-.946.19-1.927.284-2.944.284-1.584 0-2.967-.236-4.149-.71-1.158-.496-2.127-1.17-2.907-2.02-.757-.875-1.324-1.903-1.703-3.086-.378-1.205-.567-2.505-.567-3.9zm17.755 9.255V7.76l4.29-.709v9.185a11.594 11.594 0 0 1 1.632-.426 10.309 10.309 0 0 1 1.88-.177c1.489 0 2.718.213 3.687.638.993.402 1.785.981 2.376 1.738.591.732 1.005 1.62 1.241 2.66.26 1.04.39 2.198.39 3.474V34.57h-4.29v-9.752c0-.993-.071-1.832-.213-2.518-.118-.709-.331-1.276-.638-1.702a2.331 2.331 0 0 0-1.17-.957c-.497-.213-1.112-.32-1.845-.32-.567 0-1.146.06-1.737.178-.591.118-1.029.225-1.312.32v14.751H70.42zm27.164-3.014c1.324 0 2.329-.071 3.014-.213V26.59a8.348 8.348 0 0 0-1.028-.212 10.28 10.28 0 0 0-2.943 0c-.473.07-.91.2-1.312.39a2.36 2.36 0 0 0-.922.815c-.237.331-.355.757-.355 1.277 0 1.016.32 1.726.958 2.128.638.378 1.5.567 2.588.567zm-.354-15.993c1.418 0 2.612.177 3.581.532.97.354 1.738.85 2.305 1.49.591.637 1.005 1.418 1.241 2.34.26.898.39 1.89.39 2.978v11.242c-.661.141-1.666.307-3.014.496-1.324.213-2.825.32-4.503.32-1.112 0-2.128-.107-3.05-.32-.922-.213-1.714-.556-2.376-1.028a5.077 5.077 0 0 1-1.525-1.844c-.354-.757-.532-1.69-.532-2.802 0-1.064.201-1.962.603-2.695a5.096 5.096 0 0 1 1.702-1.773c.71-.473 1.525-.804 2.447-.993.946-.213 1.927-.319 2.943-.319.473 0 .97.035 1.49.106.52.048 1.075.142 1.666.284v-.71c0-.496-.059-.968-.177-1.418a2.702 2.702 0 0 0-.638-1.17c-.284-.354-.674-.626-1.17-.815-.473-.19-1.076-.284-1.809-.284-.993 0-1.903.07-2.73.213-.828.142-1.502.307-2.022.496l-.532-3.475c.544-.19 1.336-.378 2.376-.568 1.04-.189 2.152-.283 3.334-.283zm17.063 7.695l1.738-1.809 1.808-1.95c.591-.662 1.147-1.288 1.667-1.88a94.976 94.976 0 0 0 1.383-1.595h5.071a251.86 251.86 0 0 1-3.759 4.113 166.323 166.323 0 0 1-3.936 4.15 23.52 23.52 0 0 1 2.234 2.162c.78.828 1.536 1.714 2.269 2.66a53.228 53.228 0 0 1 2.057 2.837c.638.946 1.17 1.82 1.596 2.624h-4.965a31.035 31.035 0 0 0-1.489-2.305 27.787 27.787 0 0 0-1.773-2.34 34.35 34.35 0 0 0-1.951-2.128 15.905 15.905 0 0 0-1.95-1.738v8.511h-4.291V7.76l4.291-.709v16.206zm21.765 8.298c1.324 0 2.329-.071 3.015-.213V26.59a8.412 8.412 0 0 0-1.029-.212 10.274 10.274 0 0 0-2.943 0c-.473.07-.91.2-1.312.39-.378.189-.686.46-.922.815-.237.331-.355.757-.355 1.277 0 1.016.319 1.726.958 2.128.638.378 1.501.567 2.588.567zm-.354-15.993c1.418 0 2.612.177 3.581.532.97.354 1.738.85 2.305 1.49.591.637 1.005 1.418 1.242 2.34.26.898.39 1.89.39 2.978v11.242c-.662.141-1.667.307-3.015.496-1.324.213-2.825.32-4.503.32-1.111 0-2.128-.107-3.05-.32-.922-.213-1.714-.556-2.376-1.028a5.087 5.087 0 0 1-1.525-1.844c-.354-.757-.532-1.69-.532-2.802 0-1.064.201-1.962.603-2.695a5.102 5.102 0 0 1 1.702-1.773c.71-.473 1.525-.804 2.447-.993.946-.213 1.927-.319 2.944-.319.472 0 .969.035 1.489.106.52.048 1.076.142 1.667.284v-.71c0-.496-.059-.968-.178-1.418a2.703 2.703 0 0 0-.638-1.17c-.284-.354-.674-.626-1.17-.815-.473-.19-1.076-.284-1.809-.284-.993 0-1.903.07-2.73.213-.828.142-1.501.307-2.022.496l-.531-3.475c.543-.19 1.335-.378 2.375-.568a18.648 18.648 0 0 1 3.334-.283z"
                                fill="#000"
                            />
                        </svg>
                    </router-link>
                    <ul class="nav__menu">
                        <li class="nav__item">
                            <router-link
                                class="nav__link"
                                :to="{ name: 'apphome' }"
                                exact-active-class="active"
                                >Get the app</router-link
                            >
                        </li>
                        <li class="nav__item">
                            <router-link
                                class="nav__link"
                                to="/calculator"
                                exact-active-class="active"
                                >Calculator</router-link
                            >
                        </li>
                        <!-- TO-DO :: Put back when pages are ready -->
                        <!-- <li class="nav__item">
                            <router-link class="nav__link" to="/developers" active-class="active"
                                >Developers</router-link
                            >
                        </li> -->
                        <li class="nav__item">
                            <router-link
                                class="nav__link"
                                :to="{ name: 'faq' }"
                                active-class="active"
                                >Help</router-link
                            >
                        </li>
                        <li class="nav__item">
                            <router-link
                                class="nav__link"
                                :to="{ name: 'about' }"
                                active-class="active"
                                >About</router-link
                            >
                        </li>
                        <!--
                        <li class="nav__item nav__item--dropdown">
                            <span class="nav__link nav__link--dropdown" href>
                                More
                                <svg
                                    width="8"
                                    height="5"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M1 1l3 3 3-3" stroke="#485964" stroke-width="1.375" />
                                </svg>
                            </span>
                            <ul class="nav__dropdown-menu">
                                <li>
                                    <router-link to="/gift" active-class="active">Gift</router-link>
                                </li>
                                <li>
                                    <router-link to="/about" active-class="active"
                                        >About Us</router-link
                                    >
                                </li>
                            </ul>
                        </li> -->
                    </ul>
                </div>

                <ul class="nav__menu">
                    <li class="nav__menu--auth">
                        <router-link class="btn btn__primary" :to="{ name: 'login' }"
                            >Log In</router-link
                        >
                    </li>
                    <li class="nav__menu--auth">
                        <router-link class="btn btn__primary--outline" :to="{ name: 'register' }"
                            >Sign Up</router-link
                        >
                    </li>
                </ul>

                <div ref="trigger" @click.stop="toggleDropdown" class="nav__mobile-button">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div class="nav__menu--mobile" @click.stop="toggleDropdown">
                    <div class="nav__menu-wrapper">
                        <div>
                            <router-link to="/" class="nav__logo">
                                <svg
                                    width="146"
                                    height="42"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <title>chaka</title>
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M21.797 23.508c-1.875-4.414-4.593-7.19-7.632-8.818 1.24-3.224 3.728-6.301 7.963-8.802 2.597 1.87 5.597 4.97 7.285 8.81-3.033 1.63-5.744 4.403-7.616 8.81zm-.592 2.247c-.725 2.864-1.024 6.265-.75 10.288C12.827 37.816-3.64 31.352.726 14.392c6.414-1.045 17.594.323 20.48 11.363zm.858 9.914c6.915 2.837 25.532-3.37 20.922-21.277-7.979-1.3-23.334 1.135-20.922 21.277z"
                                        fill="#22A4EF"
                                    />
                                    <path
                                        d="M52.665 25.314c0-1.372.213-2.648.638-3.83.426-1.206 1.029-2.246 1.809-3.12a8.551 8.551 0 0 1 2.908-2.058c1.134-.496 2.411-.744 3.83-.744 1.749 0 3.404.319 4.964.957l-.922 3.511a9.638 9.638 0 0 0-1.702-.532 8.822 8.822 0 0 0-1.986-.213c-1.678 0-2.955.532-3.83 1.596-.874 1.04-1.312 2.518-1.312 4.433 0 1.844.414 3.31 1.241 4.397.828 1.064 2.223 1.596 4.185 1.596.733 0 1.454-.071 2.163-.213.71-.142 1.324-.32 1.844-.532l.603 3.546c-.473.236-1.194.45-2.163.638-.946.19-1.927.284-2.944.284-1.584 0-2.967-.236-4.149-.71-1.158-.496-2.127-1.17-2.907-2.02-.757-.875-1.324-1.903-1.703-3.086-.378-1.205-.567-2.505-.567-3.9zm17.755 9.255V7.76l4.29-.709v9.185a11.594 11.594 0 0 1 1.632-.426 10.309 10.309 0 0 1 1.88-.177c1.489 0 2.718.213 3.687.638.993.402 1.785.981 2.376 1.738.591.732 1.005 1.62 1.241 2.66.26 1.04.39 2.198.39 3.474V34.57h-4.29v-9.752c0-.993-.071-1.832-.213-2.518-.118-.709-.331-1.276-.638-1.702a2.331 2.331 0 0 0-1.17-.957c-.497-.213-1.112-.32-1.845-.32-.567 0-1.146.06-1.737.178-.591.118-1.029.225-1.312.32v14.751H70.42zm27.164-3.014c1.324 0 2.329-.071 3.014-.213V26.59a8.348 8.348 0 0 0-1.028-.212 10.28 10.28 0 0 0-2.943 0c-.473.07-.91.2-1.312.39a2.36 2.36 0 0 0-.922.815c-.237.331-.355.757-.355 1.277 0 1.016.32 1.726.958 2.128.638.378 1.5.567 2.588.567zm-.354-15.993c1.418 0 2.612.177 3.581.532.97.354 1.738.85 2.305 1.49.591.637 1.005 1.418 1.241 2.34.26.898.39 1.89.39 2.978v11.242c-.661.141-1.666.307-3.014.496-1.324.213-2.825.32-4.503.32-1.112 0-2.128-.107-3.05-.32-.922-.213-1.714-.556-2.376-1.028a5.077 5.077 0 0 1-1.525-1.844c-.354-.757-.532-1.69-.532-2.802 0-1.064.201-1.962.603-2.695a5.096 5.096 0 0 1 1.702-1.773c.71-.473 1.525-.804 2.447-.993.946-.213 1.927-.319 2.943-.319.473 0 .97.035 1.49.106.52.048 1.075.142 1.666.284v-.71c0-.496-.059-.968-.177-1.418a2.702 2.702 0 0 0-.638-1.17c-.284-.354-.674-.626-1.17-.815-.473-.19-1.076-.284-1.809-.284-.993 0-1.903.07-2.73.213-.828.142-1.502.307-2.022.496l-.532-3.475c.544-.19 1.336-.378 2.376-.568 1.04-.189 2.152-.283 3.334-.283zm17.063 7.695l1.738-1.809 1.808-1.95c.591-.662 1.147-1.288 1.667-1.88a94.976 94.976 0 0 0 1.383-1.595h5.071a251.86 251.86 0 0 1-3.759 4.113 166.323 166.323 0 0 1-3.936 4.15 23.52 23.52 0 0 1 2.234 2.162c.78.828 1.536 1.714 2.269 2.66a53.228 53.228 0 0 1 2.057 2.837c.638.946 1.17 1.82 1.596 2.624h-4.965a31.035 31.035 0 0 0-1.489-2.305 27.787 27.787 0 0 0-1.773-2.34 34.35 34.35 0 0 0-1.951-2.128 15.905 15.905 0 0 0-1.95-1.738v8.511h-4.291V7.76l4.291-.709v16.206zm21.765 8.298c1.324 0 2.329-.071 3.015-.213V26.59a8.412 8.412 0 0 0-1.029-.212 10.274 10.274 0 0 0-2.943 0c-.473.07-.91.2-1.312.39-.378.189-.686.46-.922.815-.237.331-.355.757-.355 1.277 0 1.016.319 1.726.958 2.128.638.378 1.501.567 2.588.567zm-.354-15.993c1.418 0 2.612.177 3.581.532.97.354 1.738.85 2.305 1.49.591.637 1.005 1.418 1.242 2.34.26.898.39 1.89.39 2.978v11.242c-.662.141-1.667.307-3.015.496-1.324.213-2.825.32-4.503.32-1.111 0-2.128-.107-3.05-.32-.922-.213-1.714-.556-2.376-1.028a5.087 5.087 0 0 1-1.525-1.844c-.354-.757-.532-1.69-.532-2.802 0-1.064.201-1.962.603-2.695a5.102 5.102 0 0 1 1.702-1.773c.71-.473 1.525-.804 2.447-.993.946-.213 1.927-.319 2.944-.319.472 0 .969.035 1.489.106.52.048 1.076.142 1.667.284v-.71c0-.496-.059-.968-.178-1.418a2.703 2.703 0 0 0-.638-1.17c-.284-.354-.674-.626-1.17-.815-.473-.19-1.076-.284-1.809-.284-.993 0-1.903.07-2.73.213-.828.142-1.501.307-2.022.496l-.531-3.475c.543-.19 1.335-.378 2.375-.568a18.648 18.648 0 0 1 3.334-.283z"
                                        fill="#000"
                                    />
                                </svg>
                            </router-link>
                            <ul class="nav__mobile-list">
                                <li class="nav__item">
                                    <router-link class="nav__link" :to="{ name: 'login' }"
                                        >Log In</router-link
                                    >
                                </li>
                                <li class="nav__item">
                                    <router-link class="nav__link" :to="{ name: 'apphome' }"
                                        >Get the app</router-link
                                    >
                                </li>
                                <li class="nav__item">
                                    <router-link class="nav__link" :to="{ name: 'calculator' }"
                                        >Calculator</router-link
                                    >
                                </li>
                                <!-- TO-DO :: Put back when pages are ready -->
                                <!-- <li class="nav__item">
                                    <router-link class="nav__link" :to="{ name: 'developers' }"
                                        >Developers</router-link
                                    >
                                </li> -->
                                <li class="nav__item">
                                    <router-link class="nav__link" :to="{ name: 'faq' }"
                                        >Help</router-link
                                    >
                                </li>
                                <li class="nav__item">
                                    <router-link class="nav__link" :to="{ name: 'about' }"
                                        >About us</router-link
                                    >
                                </li>
                            </ul>
                        </div>
                        <ul class="nav__meta">
                            <li class="nav__item">
                                <router-link :to="{ name: 'terms' }" class="nav__meta-link"
                                    >Terms & Conditions</router-link
                                >
                            </li>
                            <li class="nav__item">
                                <router-link :to="{ name: 'policies' }" class="nav__meta-link"
                                    >Policies & procedures</router-link
                                >
                            </li>
                            <li class="nav__item">
                                <router-link :to="{ name: 'privacy' }" class="nav__meta-link"
                                    >Privacy Policy</router-link
                                >
                            </li>
                        </ul>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="nav__dashboard--left" :class="{ 'nav__search--left': isSearchOpened }">
                    <router-link
                        class="nav__logo"
                        :class="{ 'nav__search--logo': isSearchOpened }"
                        :to="{ name: 'home' }"
                        exact-active-class="active"
                    >
                        <svg width="146" height="42" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <title>chaka</title>
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M21.797 23.508c-1.875-4.414-4.593-7.19-7.632-8.818 1.24-3.224 3.728-6.301 7.963-8.802 2.597 1.87 5.597 4.97 7.285 8.81-3.033 1.63-5.744 4.403-7.616 8.81zm-.592 2.247c-.725 2.864-1.024 6.265-.75 10.288C12.827 37.816-3.64 31.352.726 14.392c6.414-1.045 17.594.323 20.48 11.363zm.858 9.914c6.915 2.837 25.532-3.37 20.922-21.277-7.979-1.3-23.334 1.135-20.922 21.277z"
                                fill="#22A4EF"
                            />
                            <path
                                d="M52.665 25.314c0-1.372.213-2.648.638-3.83.426-1.206 1.029-2.246 1.809-3.12a8.551 8.551 0 0 1 2.908-2.058c1.134-.496 2.411-.744 3.83-.744 1.749 0 3.404.319 4.964.957l-.922 3.511a9.638 9.638 0 0 0-1.702-.532 8.822 8.822 0 0 0-1.986-.213c-1.678 0-2.955.532-3.83 1.596-.874 1.04-1.312 2.518-1.312 4.433 0 1.844.414 3.31 1.241 4.397.828 1.064 2.223 1.596 4.185 1.596.733 0 1.454-.071 2.163-.213.71-.142 1.324-.32 1.844-.532l.603 3.546c-.473.236-1.194.45-2.163.638-.946.19-1.927.284-2.944.284-1.584 0-2.967-.236-4.149-.71-1.158-.496-2.127-1.17-2.907-2.02-.757-.875-1.324-1.903-1.703-3.086-.378-1.205-.567-2.505-.567-3.9zm17.755 9.255V7.76l4.29-.709v9.185a11.594 11.594 0 0 1 1.632-.426 10.309 10.309 0 0 1 1.88-.177c1.489 0 2.718.213 3.687.638.993.402 1.785.981 2.376 1.738.591.732 1.005 1.62 1.241 2.66.26 1.04.39 2.198.39 3.474V34.57h-4.29v-9.752c0-.993-.071-1.832-.213-2.518-.118-.709-.331-1.276-.638-1.702a2.331 2.331 0 0 0-1.17-.957c-.497-.213-1.112-.32-1.845-.32-.567 0-1.146.06-1.737.178-.591.118-1.029.225-1.312.32v14.751H70.42zm27.164-3.014c1.324 0 2.329-.071 3.014-.213V26.59a8.348 8.348 0 0 0-1.028-.212 10.28 10.28 0 0 0-2.943 0c-.473.07-.91.2-1.312.39a2.36 2.36 0 0 0-.922.815c-.237.331-.355.757-.355 1.277 0 1.016.32 1.726.958 2.128.638.378 1.5.567 2.588.567zm-.354-15.993c1.418 0 2.612.177 3.581.532.97.354 1.738.85 2.305 1.49.591.637 1.005 1.418 1.241 2.34.26.898.39 1.89.39 2.978v11.242c-.661.141-1.666.307-3.014.496-1.324.213-2.825.32-4.503.32-1.112 0-2.128-.107-3.05-.32-.922-.213-1.714-.556-2.376-1.028a5.077 5.077 0 0 1-1.525-1.844c-.354-.757-.532-1.69-.532-2.802 0-1.064.201-1.962.603-2.695a5.096 5.096 0 0 1 1.702-1.773c.71-.473 1.525-.804 2.447-.993.946-.213 1.927-.319 2.943-.319.473 0 .97.035 1.49.106.52.048 1.075.142 1.666.284v-.71c0-.496-.059-.968-.177-1.418a2.702 2.702 0 0 0-.638-1.17c-.284-.354-.674-.626-1.17-.815-.473-.19-1.076-.284-1.809-.284-.993 0-1.903.07-2.73.213-.828.142-1.502.307-2.022.496l-.532-3.475c.544-.19 1.336-.378 2.376-.568 1.04-.189 2.152-.283 3.334-.283zm17.063 7.695l1.738-1.809 1.808-1.95c.591-.662 1.147-1.288 1.667-1.88a94.976 94.976 0 0 0 1.383-1.595h5.071a251.86 251.86 0 0 1-3.759 4.113 166.323 166.323 0 0 1-3.936 4.15 23.52 23.52 0 0 1 2.234 2.162c.78.828 1.536 1.714 2.269 2.66a53.228 53.228 0 0 1 2.057 2.837c.638.946 1.17 1.82 1.596 2.624h-4.965a31.035 31.035 0 0 0-1.489-2.305 27.787 27.787 0 0 0-1.773-2.34 34.35 34.35 0 0 0-1.951-2.128 15.905 15.905 0 0 0-1.95-1.738v8.511h-4.291V7.76l4.291-.709v16.206zm21.765 8.298c1.324 0 2.329-.071 3.015-.213V26.59a8.412 8.412 0 0 0-1.029-.212 10.274 10.274 0 0 0-2.943 0c-.473.07-.91.2-1.312.39-.378.189-.686.46-.922.815-.237.331-.355.757-.355 1.277 0 1.016.319 1.726.958 2.128.638.378 1.501.567 2.588.567zm-.354-15.993c1.418 0 2.612.177 3.581.532.97.354 1.738.85 2.305 1.49.591.637 1.005 1.418 1.242 2.34.26.898.39 1.89.39 2.978v11.242c-.662.141-1.667.307-3.015.496-1.324.213-2.825.32-4.503.32-1.111 0-2.128-.107-3.05-.32-.922-.213-1.714-.556-2.376-1.028a5.087 5.087 0 0 1-1.525-1.844c-.354-.757-.532-1.69-.532-2.802 0-1.064.201-1.962.603-2.695a5.102 5.102 0 0 1 1.702-1.773c.71-.473 1.525-.804 2.447-.993.946-.213 1.927-.319 2.944-.319.472 0 .969.035 1.489.106.52.048 1.076.142 1.667.284v-.71c0-.496-.059-.968-.178-1.418a2.703 2.703 0 0 0-.638-1.17c-.284-.354-.674-.626-1.17-.815-.473-.19-1.076-.284-1.809-.284-.993 0-1.903.07-2.73.213-.828.142-1.501.307-2.022.496l-.531-3.475c.543-.19 1.335-.378 2.375-.568a18.648 18.648 0 0 1 3.334-.283z"
                                fill="#000"
                            />
                        </svg>
                    </router-link>
                    <form
                        class="nav-left__form"
                        v-if="getWindowWidth !== 'mobile'"
                        @submit.prevent="startSearch"
                    >
                        <input
                            type="text"
                            name="search"
                            v-model="search"
                            placeholder="Search stocks by name, symbol, tag.."
                            class="nav-left__input"
                            @focus="startSearch"
                            @blur="stopSearch"
                            @input="startSearch"
                            autocomplete="off"
                            ref="search"
                        />
                        <transition name="kyc-navbar">
                            <div
                                class="nav-left__dropdown"
                                v-if="showSearch && getErrorLog.type !== 'search'"
                            >
                                <div v-if="searchLoading && search">
                                    <div class=" loader" v-for="i in 3" :key="i">
                                        <div class="loader-div" />
                                    </div>
                                </div>
                                <div v-else-if="searchLoading"></div>
                                <ul v-else-if="getSearchInstruments.length > 0">
                                    <li v-for="(stock, i) in filteredSearch" :key="i">
                                        <router-link
                                            :to="{
                                                name: 'singlestock',
                                                params: { symbol: stock.symbol }
                                            }"
                                        >
                                            <img
                                                :src="stock.logoUrl"
                                                :alt="stock.symbol"
                                                class="nav-left__dropdown--logo"
                                            />
                                            <div>
                                                <p>
                                                    <small>{{ stock.name | truncate(15) }}</small>
                                                </p>
                                                <p class="grey-cool">{{ stock.symbol }}</p>
                                            </div>

                                            <img
                                                :src="stockCountry(stock.countryCode)"
                                                width="16px"
                                                :alt="stock.symbol"
                                                class="nav-left__dropdown--country"
                                            />
                                        </router-link>
                                    </li>
                                </ul>
                                <div class=" nav-left__dropdown--loader" v-else>
                                    <p>
                                        There are no instruments related to
                                        <strong>{{ search }}</strong>
                                    </p>
                                </div>
                            </div>
                        </transition>
                    </form>
                    <div class="nav-left__icon" v-else>
                        <form
                            class="nav-left__form"
                            :class="{ show: isSearchOpened }"
                            @submit.prevent="startSearch"
                        >
                            <template v-if="isSearchOpened">
                                <input
                                    type="text"
                                    name="search"
                                    v-model="search"
                                    placeholder="Search stocks by name, symbol, tag.."
                                    class="nav-left__input"
                                    @focus="startSearch"
                                    @blur="stopSearch"
                                    @input="startSearch"
                                    autocomplete="off"
                                    ref="mobileInput"
                                />
                                <transition name="kyc-navbar">
                                    <div
                                        class="nav-left__dropdown"
                                        @click="closeSearch"
                                        v-if="showSearch && getErrorLog.type !== 'search'"
                                    >
                                        <div v-if="searchLoading && search">
                                            <div class=" loader" v-for="i in 3" :key="i">
                                                <div class="loader-div" />
                                            </div>
                                        </div>
                                        <div v-else-if="searchLoading"></div>
                                        <ul v-else-if="getSearchInstruments.length > 0">
                                            <li v-for="(stock, i) in filteredSearch" :key="i">
                                                <router-link
                                                    :to="{
                                                        name: 'singlestock',
                                                        params: { symbol: stock.symbol }
                                                    }"
                                                >
                                                    <img
                                                        :src="stock.logoUrl"
                                                        :alt="stock.symbol"
                                                        class="nav-left__dropdown--logo"
                                                    />
                                                    <div>
                                                        <p>
                                                            <small>{{
                                                                stock.name | truncate(15)
                                                            }}</small>
                                                        </p>
                                                        <p class="grey-cool">{{ stock.symbol }}</p>
                                                    </div>

                                                    <img
                                                        :src="stockCountry(stock.countryCode)"
                                                        width="16px"
                                                        :alt="stock.symbol"
                                                        class="nav-left__dropdown--country"
                                                    />
                                                </router-link>
                                            </li>
                                        </ul>
                                        <div class=" nav-left__dropdown--loader" v-else>
                                            <p>
                                                There are no instruments related to
                                                <strong>{{ search }}</strong>
                                            </p>
                                        </div>
                                    </div>
                                </transition>
                            </template>
                            <img
                                @click="SEARCH_OPENED(true)"
                                class="nav-left__form--icon"
                                src="../assets/img/search.svg"
                                alt="Search"
                                width="18px"
                            />
                        </form>
                    </div>
                </div>

                <ul class="nav__dashboard--menu" :class="{ 'nav__search--right': isSearchOpened }">
                    <template v-if="Object.keys(getAccountSummary).length > 0">
                        <p>
                            <router-link
                                class="nav__dashboard--mobile"
                                :to="{ name: 'accounts-wallet' }"
                            >
                                <strong>Avail</strong>
                                <span
                                    :title="
                                        getAccountSummary.localAvailableToTrade
                                            | kobo
                                            | currency('NGN', true)
                                    "
                                    >:
                                    {{
                                        getAccountSummary.localAvailableToTrade
                                            | kobo
                                            | currency("NGN")
                                    }}</span
                                >
                                <span>&nbsp;|&nbsp;</span>
                                <span
                                    :title="
                                        getAccountSummary.globalAvailableToTrade
                                            | kobo
                                            | currency('USD', true)
                                    "
                                    >{{
                                        getAccountSummary.globalAvailableToTrade
                                            | kobo
                                            | currency("USD")
                                    }}</span
                                ></router-link
                            >
                        </p>
                        <router-link
                            class="wallet-icon"
                            :to="{ name: 'accounts-wallet' }"
                            v-if="getWindowWidth === 'mobile'"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                version="1.1"
                                id="Capa_1"
                                x="0px"
                                y="0px"
                                viewBox="0 0 512.001 512.001"
                                style="enable-background:new 0 0 512.001 512.001;"
                                xml:space="preserve"
                                width="512px"
                                height="512px"
                                class="wallet-icon"
                            >
                                <g>
                                    <g>
                                        <g>
                                            <path
                                                d="M405,257.002c-33.084,0-60,26.916-60,60c0,33.084,26.916,60,60,60h85c0.339,0,0.67-0.034,1.005-0.051    c0.332,0.016,0.659,0.05,0.995,0.05c11.046,0,20-8.954,20-20v-157c0-26.626-13.087-50.241-33.155-64.79l-68.04-111.62    c-2.774-4.552-7.251-7.808-12.437-9.044c-5.186-1.238-10.65-0.353-15.181,2.457L333.01,48.12L310.382,9.826    c-2.721-4.604-7.171-7.926-12.358-9.226c-5.186-1.3-10.679-0.467-15.248,2.309L90.109,120.001H60    c-10.861,0-19.728-8.702-19.994-19.5c0.266-10.798,9.133-19.5,19.994-19.5h37c11.046,0,20-8.954,20-20s-8.954-20-20-20H60    c-28.298,0-52.081,19.694-58.37,46.095C0.584,89.522,0,92.192,0,95.001v5v1v331c0,44.112,35.888,80,80,80h352    c34.49,0,64.993-21.971,75.901-54.671c3.496-10.478-2.165-21.806-12.643-25.301c-10.477-3.495-21.806,2.165-25.301,12.643    c-5.453,16.346-20.706,27.329-37.957,27.329H80c-22.056,0-40-17.944-40-40V156.57c6.259,2.22,12.99,3.431,20,3.431h372    c22.056,0,40,17.944,40,40v57.001H405z M472,337.001h-67c-11.028,0.001-20-8.971-20-20c0-11.028,8.972-20,20-20h67V337.001z     M167.128,120.002l119.119-72.393l21.297,36.041c0.409,0.985,0.879,1.956,1.459,2.892c0.435,0.701,0.917,1.354,1.42,1.982    l18.6,31.478H167.128z M375.485,120.001l-22.121-37.436L387.14,61.62l35.588,58.381H375.485z"
                                                data-original="#000000"
                                                class="active-path"
                                                data-old_color="#000000"
                                                fill="#2DA5EC"
                                            />
                                        </g>
                                    </g>
                                </g>
                            </svg>
                        </router-link>
                        <button class="btn btn__icon btn__icon--md btn__primary" @click="showFund">
                            +
                        </button>
                    </template>
                    <p v-else>
                        <router-link
                            class="nav__dashboard--mobile"
                            :to="{ name: 'accounts-wallet' }"
                        >
                            <strong>Avail:&nbsp;</strong>
                            <span>₦-</span>
                            <span>&nbsp;|&nbsp;</span>
                            <span>$-</span></router-link
                        >
                        <button class="btn btn__icon btn__icon--md btn__primary" @click="showFund">
                            +
                        </button>
                    </p>
                </ul>
            </template>
        </nav>
    </header>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import EventBus from "../event-bus";

export default {
    name: "app-header",
    data() {
        return {
            isSidebarOpen: false,
            search: null,
            showSearch: false,
            showKYC: false,
            searchLoading: false
        };
    },
    computed: {
        ...mapGetters([
            "isLoggedIn",
            "getLoggedUser",
            "getAccountSummary",
            "getNextKYC",
            "getErrorLog",
            "getSearchInstruments",
            "getWindowWidth",
            "isSearchOpened"
        ]),
        filteredSearch() {
            const splice = [...this.getSearchInstruments].splice(0, 4);
            return splice;
        }
    },
    methods: {
        ...mapActions(["SEARCH_INSTRUMENTS"]),
        ...mapMutations([
            "SET_KYC_MODAL",
            "SET_FUND_MODAL",
            "SET_SEARCH_INSTRUMENTS",
            "SEARCH_OPENED"
        ]),
        toggleSidebar() {
            this.isSidebarOpen = !this.isSidebarOpen;
        },
        toggleDropdown() {
            this.$refs.trigger.classList.toggle("is-active");
            this.$refs.trigger.nextElementSibling.classList.toggle("show");
            document.body.classList.toggle("no-scroll");
            this.toggleSidebar();
        },
        showFund() {
            this.SET_FUND_MODAL(true);
        },
        stockCountry(countryCode) {
            if (countryCode)
                return `https://chaka-storage.s3-eu-west-1.amazonaws.com/images/ui/flags/${countryCode.toLowerCase()}-flag.svg`;
            return "zz";
        },
        async startSearch() {
            this.showSearch = true;
            let payload = {};
            if (!this.search) {
                payload = {
                    query: "a"
                };
            } else payload = { query: this.search };
            this.searchLoading = true;
            await this.SEARCH_INSTRUMENTS(payload);
            this.searchLoading = false;
        },
        stopSearch() {
            this.showSearch = false;
            this.search = null;
            this.SET_SEARCH_INSTRUMENTS([]);
        },
        closeSearch() {
            this.SEARCH_OPENED(false);
        }
    },
    mounted() {
        EventBus.$on("HIDE_HEADER", payload => {
            if (payload && this.$refs.search) this.$refs.search.blur();
        });
        mixpanel.track("GETAPP_PAGE") //tracks the getapppage
    },
    watch: {
        isSidebarOpen(val) {
            if (!val) {
                this.$refs.trigger.classList.remove("is-active");
                this.$refs.trigger.nextElementSibling.classList.remove("show");
                document.body.classList.remove("no-scroll");
            }
        },
        isSearchOpened(val) {
            if (val) {
                setTimeout(() => {
                    this.$refs.mobileInput.focus();
                }, 100);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.flex {
    display: flex;
    width: 100%;
}
</style>
