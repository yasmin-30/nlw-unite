//array
let participantes = [
    {
      nome: "Mel Silva",
      email: "mel@gmail.com",
      dataInscricao: new Date(2024, 2, 22, 19, 20),
      dataCheckIn: new Date(2024, 2, 25, 22, 0)
    },
    {
      nome: "Yasmin Carvalho",
      email: "yasmin@gmail.com",
      dataInscricao: new Date(2024, 1, 20, 19, 23),
      dataCheckIn: new Date(2024, 1, 25, 22, 40)
    },
    {
      nome: "João Oliveira",
      email: "joao@gmail.com",
      dataInscricao: new Date(2024, 0, 15, 14, 10),
      dataCheckIn: null
    },
    {
      nome: "Maria Santos",
      email: "maria@gmail.com",
      dataInscricao: new Date(2024, 3, 5, 10, 5),
      dataCheckIn: new Date(2024, 3, 10, 9, 15)
    },
    {
      nome: "Pedro Souza",
      email: "pedro@gmail.com",
      dataInscricao: new Date(2024, 4, 12, 8, 45),
      dataCheckIn: new Date(2024, 4, 18, 16, 20)
    },
    {
      nome: "Ana Costa",
      email: "ana@gmail.com",
      dataInscricao: new Date(2024, 6, 8, 17, 30),
      dataCheckIn: new Date(2024, 6, 14, 21, 50)
    },
    {
      nome: "Lucas Pereira",
      email: "lucas@gmail.com",
      dataInscricao: new Date(2024, 5, 3, 11, 20),
      dataCheckIn: null
    },
    {
      nome: "Juliana Rodrigues",
      email: "juliana@gmail.com",
      dataInscricao: new Date(2024, 7, 17, 9, 0),
      dataCheckIn: new Date(2024, 7, 22, 20, 10)
    },
    {
      nome: "Carlos Almeida",
      email: "carlos@gmail.com",
      dataInscricao: new Date(2024, 8, 21, 16, 50),
      dataCheckIn: null
    },
    {
      nome: "Rafael Gomes ",
      email: "rafael@gmail.com",
      dataInscricao: new Date(2024, 9, 30, 12, 15),
      dataCheckIn: new Date(2024, 10, 5, 19, 55)
    }
  ];
  
  const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)
  
  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

  if(participante.dataCheckIn == null){
    dataCheckIn = `
    <button data-email="${participante.email}" onclick="fazerCheckIn(event)">
    Confirmar check-in
    </button>
    `
  }
  
    return `
     <tr>
        <td>
          <strong>
            ${participante.nome}
          </strong>
          <br>
          <small>
             ${participante.email}
          </small>
        </td>
        <td> ${dataInscricao}</td>
        <td> ${dataCheckIn}</td>
      </tr>
      `
  }
  
  
  const atualizarLista = (participantes) => {
    let output = ""
    //estrutura de repetição - loop
    for(let participante of participantes){
      output = output + criarNovoParticipante(participante)
    }
    //substituir infos do html
    document.querySelector('tbody').innerHTML = output
  } //arrow function = coloca os códigos que quiser para usar depois = variável que contem uma função dentro
  
  atualizarLista(participantes)

  const adicionarParticipante = (event) => {
    event.preventDefault()

    const dadosFormulario = new FormData(event.target)

    const participante  = {
        nome: dadosFormulario.get('nome'),
        email: dadosFormulario.get('email'),
        dataInscricao: new Date(),
        dataCheckIn: null
    }
    //verificar se o participante já existe
    const participanteExiste = participantes.find(
        (p) => p.email == participante.email
    )

    if(participanteExiste){
        alert('Email já cadastrado!')
        return
    }


    participantes = [participante, ...participantes] //spread (...)
    atualizarLista(participantes)

    //limpar formulário
    event.target.querySelector('[name="nome"]').value = ""
    event.target.querySelector('[name="email"]').value = ""
} 

const fazerCheckIn = (event) => {
    //confirmar se realmente quer fazer o check-in
    const msgconfirm = 'Tem certeza que deseja fazer o check-in?'

    if(confirm(msgconfirm) == false){
        return
    }

    //encontrar o participante dentro da lista
    const participante = participantes.find((p) => {
        return p.email == event.target.dataset.email
    })
    //atualizar o check-in de participantes
    participante.dataCheckIn = new Date()

    //atualizar lista de participantes
    atualizarLista(participantes)
  }
 