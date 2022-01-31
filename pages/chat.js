import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import {useRouter} from 'next/router';
import { createClient } from '@supabase/supabase-js';
import { ButtonSendSticker } from '../src/components/ButtonSendSticker'


const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMxNDM4NCwiZXhwIjoxOTU4ODkwMzg0fQ.3NI-abWzLQlhBUNMp8JbazUvj6_w3MFpqcwKngbv55o"
const SUPABASE_URL = "https://hdvisfamazyutkzmnwot.supabase.co"
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function escutaMensagensEmTempoReal(adicionaMensagem) {
    return supabaseClient
      .from('mensagens')
      .on('INSERT', (respostaLive) => {
        adicionaMensagem(respostaLive.new);
      })
      .subscribe();
  }

// const supabaseClient = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);


export default function ChatPage() {
    
    /* Usuario digita no textarea
       Aperta enter para enviar
       tem que adicionar texto na <listagem></listagem>*/

    /* Dev
       Campo criado
       Vamos usar o onChange com useState (if para entender e limpar variavel)
       Lista de mensagens*/

    const [mensagem, setMensagem ] = React.useState('');
    const [listaDeMensagens, setListaDeMensagens] = React.useState([]);
    const roteamento = useRouter();
    const usuarioLogado = roteamento.query.username;


    React.useEffect(() => {
        supabaseClient
          .from('mensagem')
          .select('*')
          .order('id', { ascending: false })
          .then(({ data }) => {
            // console.log('Dados da consulta:', data);
            setListaDeMensagens(data);
          });

          const subscription = escutaMensagensEmTempoReal((novaMensagem) => {
            setListaDeMensagens((valorAtualDaLista) => {
              return [
                novaMensagem,
                ...valorAtualDaLista,
              ]
            });
          });
      
          return () => {
            subscription.unsubscribe();
          }
        }, [listaDeMensagens]);
      

        function handleNovaMensagem(novaMensagem) {
            const mensagem = {
              // id: listaDeMensagens.length + 1,
              de: usuarioLogado,
              texto: novaMensagem,
            };
            
        supabaseClient
        .from('mensagem')
        .insert([
            mensagem
        ])
        .then((data) => {
            // setListaDeMensagens([
            //     mensagem,
            //     ...listaDeMensagens
            // ]);
        });
        
        setMensagem('');
    }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://static-ott.netshow.me/sites/67/media/50108/furacaolive_top03.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >

                    <MessageList mensagens={listaDeMensagens} />
                
                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                        value={mensagem}
                        onChange={(event) => {
                            //Onde está o valor
                            const valor = event.target.value;
                            // Troca o valor da variavel com function do estado
                            
                            setMensagem(valor);
          
                          }}
                          onKeyPress={(event)=> {
                            if ((event.code === 'Enter' || event.code === 'NumpadEnter') && event.key === 'Enter' && event.target.value != ""){
                                event.preventDefault();
                                handleNovaMensagem(mensagem);
                            }
                          }}

                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />

                        <ButtonSendSticker
                            onStickerClick={(sticker) => {
                                handleNovaMensagem(':sticker: ' + sticker);
                            }}
                        />

                        <Button 
                        iconName="arrowRight"
                        buttonColors={{
                            contrastColor: appConfig.theme.colors.neutrals["000"],
                            mainColor: appConfig.theme.colors.primary[600],
                            mainColorLight: appConfig.theme.colors.primary[400],
                            mainColorStrong: appConfig.theme.colors.primary[600],
                          }}

                          styleSheet={{
                            borderRadius: '50%',
                            padding: '0 3px 0 0',
                            minWidth: '50px',
                            minHeight: '50px',
                            fontSize: '20px',
                            marginBottom: '8px',
                            lineHeight: '0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            hover: {
                              backgroundColor: appConfig.theme.colors.neutrals["000"],
                              color: appConfig.theme.colors.primary["600"],
                              borderColor: appConfig.theme.colors.primary["600"]
                            },
                            marginLeft: '5px'
                          }}

                        onClick={(event)=> {
                            if (event.target.value != ""){
                                event.preventDefault();
                                handleNovaMensagem(mensagem);
                            }
                            
                          }}
                          
                        />
                    </Box>
                    
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Furacord
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    return (
        <Box
          tag="ul"
          styleSheet={{
            overflow: 'scroll',
            display: 'flex',
            flexDirection: 'column-reverse',
            flex: 1,
            color: appConfig.theme.colors.neutrals["000"],
            marginBottom: '16px'
          }}
        >
          {props.mensagens.map((mensagem) => {
            return (
              <Text
                key={mensagem.id}
                tag="li"
                styleSheet={{
                  borderRadius: '5px',
                  padding: '6px',
                  marginBottom: '12px',
                  hover: {
                    backgroundColor: appConfig.theme.colors.neutrals[700]
                  }
                }}
              >
                <Box
                  styleSheet={{
                    marginBottom: '8px',
                  }}
                >
                  <Image
                    styleSheet={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      display: 'inline-block',
                      marginRight: '8px',
                    }}
                    src={`https://github.com/${mensagem.de}.png`}
                  />
                  <Text tag="strong">
                    {mensagem.de}
                  </Text>
                  <Text
                    styleSheet={{
                      fontSize: '10px',
                      marginLeft: '8px',
                      color: appConfig.theme.colors.neutrals[300],
                    }}
                    tag="span"
                  >
                    {(new Date().toLocaleDateString())}
                  </Text>
                </Box>
                {/* [Declarativo] */}
                {/* Condicional: {mensagem.texto.startsWith(':sticker:').toString()} */}
                {mensagem.texto.startsWith(':sticker:')
                  ? (
                    <Image src={mensagem.texto.replace(':sticker:', '')} />
                  )
                  : (
                    mensagem.texto
                  )}
                {/* if mensagem de texto possui stickers:
                               mostra a imagem
                            else 
                               mensagem.texto */}
                {/* {mensagem.texto} */}
              </Text>
            );
          })}
        </Box>
      )
    }