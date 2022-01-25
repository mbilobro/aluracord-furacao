import {Box, Button, Text, TextField, Image} from '@skynexui/components';
import React from 'react';
import {useRouter} from 'next/router';
import appConfig from '../config.json';
import { setConfig } from 'next/config';


 function Titulo(props) {
    const Tag = props.tag || 'h1';
    return (
      <>
        <Tag>{props.children}</Tag>
        <style jsx>{`
              ${Tag} {
                  color: ${appConfig.theme.colors.neutrals['000']};
                  font-size: 24px;
                  font-weight: 600;
              }
              `}</style>
      </>
    );
  }

  export default function PaginaInicial() {
    // const username = 'mbilobro';

    const [username, setUsername ] = React.useState('mbilobro');
    const [image, setImage] = React.useState(`https://github.com/${username}.png`);
    const roteamento = useRouter();
  
    return (
      <>
        <Box
          styleSheet={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            // backgroundColor: appConfig.theme.colors.primary[500],
            backgroundImage: 'url(https://static-ott.netshow.me/sites/67/media/50108/furacaolive_top03.jpg)',
            backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
          }}
        >
          <Box
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
              width: '100%', maxWidth: '700px',
              borderRadius: '5px', padding: '32px', margin: '16px',
              boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
              backgroundColor: appConfig.theme.colors.neutrals[700],
            }}
          >
            {/* Formulário */}
            <Box
              as="form"
              onSubmit={function(event){
                event.preventDefault();
                roteamento.push('/chat');
                
              }}
              styleSheet={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
              }}
            >
              <Titulo tag="h2">Furacord!</Titulo>
              <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
                {appConfig.name}
              </Text>
  
              <TextField
                value={username}
                onChange={function(event) {
                  //Onde está o valor
                  const valor = event.target.value;
                  // Troca o valor da variavel com a function do estado
                  valor.length < 2 ? setImage(false) : setImage(`https://github.com/${username}.png`);
                  
                  setUsername(valor);

                }}
                fullWidth
                textFieldColors={{
                  neutral: {
                    textColor: appConfig.theme.colors.neutrals[200],
                    mainColor: appConfig.theme.colors.neutrals[900],
                    mainColorHighlight: appConfig.theme.colors.primary[500],
                    backgroundColor: appConfig.theme.colors.neutrals[800],
                  },
                }}
              />
              
              <Button
                type='submit'
                label='Entrar'
                fullWidth
                buttonColors={{
                  contrastColor: appConfig.theme.colors.neutrals["000"],
                  mainColor: appConfig.theme.colors.primary[500],
                  mainColorLight: appConfig.theme.colors.primary[400],
                  mainColorStrong: appConfig.theme.colors.primary[600],
                }}
              />
            </Box>
            {/* Formulário */}
  
  
            {/* Photo Area */}
            <Box
              styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '200px',
                padding: '16px',
                backgroundColor: appConfig.theme.colors.neutrals[800],
                border: '1px solid',
                borderColor: appConfig.theme.colors.neutrals[999],
                borderRadius: '10px',
                flex: 1,
                minHeight: '240px',
              }}
            >
              <Image
              
                styleSheet={{
                  borderRadius: '50%',
                  marginBottom: '16px',
                }}

                src={image}
              />

              <Text
                variant="body4"
                styleSheet={{
                  color: appConfig.theme.colors.neutrals[200],
                  backgroundColor: appConfig.theme.colors.neutrals[900],
                  padding: '3px 10px',
                  borderRadius: '1000px'
                }}
              >
                {username}
              </Text>
            </Box>
            {/* Photo Area */}
          </Box>
        </Box>
      </>
    );
  }

//     function Title(props){
//         const Tag = props.tag;
//         return(
//             <>
//             <Tag>{props.children}</Tag>

//             <style jsx>{`
//                 ${Tag}{
//                         color:${appConfig.theme.colors.primary[400]};
//                         font-size:50px;
//                         font-weight:700;
//                     }                
//                 `}</style>
//             </>
//         );
//     }
//     function HomePage() {
//         //JSX
//         return (
//             <div>
//                 <GlobalStyle />
//                 <Title tag="h1">Boas vindas de volta!</Title>
//                 <h2>Bilocord - Um chat para falar sobre o furacão</h2>

//                 <style jsx>{`
//                     h2{
//                         color:${appConfig.theme.colors.neutrals[900]};
//                     }
                
//                 `}</style>
//             </div>
//         )
//     }
  
//   export default HomePage