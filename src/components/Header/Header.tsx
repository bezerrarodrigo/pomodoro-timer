import { Scroll, Timer } from '@phosphor-icons/react'
import { NavLink } from 'react-router-dom'

import logoIgnite from '../../assets/logo.svg'
import { HeaderContainer } from './styles'

export default function Header() {
  return (
    <HeaderContainer>
      <img src={logoIgnite} alt="" />
      <nav>
        <NavLink to="/" title="Index">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="History">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
