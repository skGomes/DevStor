import Cabecalho from '../../components/cabecalho'
import Menu from '../../components/menu'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css';
import LoadingBar from 'react-top-loading-bar'
import { Container, Conteudo } from './styled'


import Api from '../../service/api'
import { useState , useEffect, useRef} from 'react';
const api = new Api();

export default function Index() {

    const [produto, setProduto] = useState([]);
    const [NMPRODUTO, setNomePRODUTO] = useState('');
    const [CATEGORIA, setProdutoCATEGORIA] = useState('');
    const [AVALIACAO, setAVALIACAO] = useState('');
    const [IMG, setIMG] = useState('');
    const [PRECODE, setPRECODE] = useState('');
    const [PRECOPOR, setPRECOPOR] = useState('');
    const [ESTOQUE, setESTOQUE] = useState('');
    const [DESCRICAO, setDESCRICAO] = useState('');
    const [IDALTERNATIVO, setIDALTERNATIVO] = useState(0);
    const load = useRef(null)   


     async function listar(){
        load.current.continuousStart();
    
        let r = await api.listar();
        setProduto(r);
        load.current.complete();
        
    }

    

   
    async function inserir(){
        load.current.continuousStart();
        if(PRECODE< 0)
        return  toast.error('Não insira números negativos!')

        if(PRECOPOR< 0)
        return  toast.error('Não insira números negativos!')

        if(AVALIACAO< 0)
        return  toast.error('Não insira números negativos!')

        if(ESTOQUE< 0)
        return  toast.error('Não insira números negativos!')

        if(PRECODE === '')
        return toast.error("O campo Preço DE precisa ser preenchido!");
    
        if(PRECOPOR === '')
        return toast.error("O campo Preço POR precisa ser preenchido!");
    
        if(AVALIACAO  === '')
        return toast.error("O campo Avaliação precisa ser preenchido!");
    
        if(ESTOQUE  === '')
        return toast.error("O campo ESTOQUE precisa ser preenchido!");

        if(NMPRODUTO  === '')
        return toast.error("O campo Nome precisa ser preenchido!");

        if(CATEGORIA  === '')
        return toast.error("O campo CATEGORIA precisa ser preenchido!");

        if(DESCRICAO  === '')
        return toast.error("O campo Descrição precisa ser preenchido!");

        if(IMG  === '')
        return toast.error("O campo Link Imagem precisa ser preenchido!");


        if (IDALTERNATIVO == 0 ) {
        let r = await api.inserir(NMPRODUTO, CATEGORIA, PRECODE, PRECOPOR, AVALIACAO, DESCRICAO, ESTOQUE, IMG );

        if (!validarResposta(r)) 
        return      
             else 
             toast.dark('Produto Colocado');
        } else {
            let r = await api.alterar(IDALTERNATIVO, NMPRODUTO, CATEGORIA, PRECODE, PRECOPOR, AVALIACAO, DESCRICAO, ESTOQUE, IMG);
            
            if (r.erro) alert(r.erro);
            
             else 
             toast.dark('Produto Alterado')
    
        } 
        load.current.complete();   
        limparCampos();
        listar();
    }

    async function editar(item) {
        
                setNomePRODUTO(item.nm_produto);
                setProdutoCATEGORIA(item.ds_categoria);
                setIMG(item.img_produto);
                setPRECODE(item.vl_preco_de);
                setIDALTERNATIVO(item.id_produto);
                setPRECOPOR(item.vl_preco_por);
                setESTOQUE(item.qtd_estoque);
                setDESCRICAO(item.ds_produto);
                setAVALIACAO(item.vl_avaliacao);
    }



    async function remover(id){
        confirmAlert({
            title: 'Remover Produto?',
            message: `Tem certeza que deseja excluir o produto ${id}?`, 
            buttons:[
                {
                    label: 'Sim',
                    onClick: async () =>{
                        let r = await api.remover(id);
                        if (r.erro)
                        toast.erro(`${r.erro}`);
                    else {
                        toast.dark('Produto Removido!')
                        listar();
                    }
                    }
                },
                {
                    label: 'Não'
                }
            ]
        })
    }

const validarResposta = (resp) => {
       
        
        if (!resp.erro)
            return true;
            toast.error(`${resp.erro}`);
        return false;
    }


    function limparCampos(){
                setNomePRODUTO('');
                setProdutoCATEGORIA('');
                setAVALIACAO('');
                setIMG('');
                setPRECODE('');
                setPRECOPOR('');
                setESTOQUE('');
                setDESCRICAO('');
                setIDALTERNATIVO(0);
    }
    

    useEffect(() =>{
        listar();
     }, [])

    return (
        <Container>
            <ToastContainer />
            <LoadingBar color="#10EAEA" ref = {load} />
            <Menu />
            <Conteudo>
                <Cabecalho />
                <div class="body-right-box">
                    <div class="new-student-box">
                        
                        <div class="text-new-student">
                            <div class="bar-new-student"></div>
                            <div class="text-new-student"> {IDALTERNATIVO == 0 ? "Produto" : "Alterando Produto"  + IDALTERNATIVO} </div>
                        </div>

                        <div class="input-new-student"> 
                            <div class="input-left">
                                <div class="agp-input"> 
                                    <div class="name-student"> Nome: </div>  
                                    <div class="input"> <input type="text" value={NMPRODUTO} onChange={e => setNomePRODUTO(e.target.value)}/> </div>  
                                    <div class="corse-student" style={{marginLeft:"30px", marginRight:"27px"}}> Preço DE: </div>  
                                    <div class="input"> <input type="text" value={PRECODE} onChange={e => setPRECODE(e.target.value)}/> </div>
                                    
                                </div> 
                                <div class="agp-input">
                                    <div class="number-student"> Categoria: </div>  
                                    <div class="input"> <input type="text" value={CATEGORIA} onChange={e => setProdutoCATEGORIA(e.target.value)}/> </div> 
                                    <div class="class-student" style={{marginLeft: "30px"}}> Preço POR: </div>  
                                    <div class="input"> <input type="text" value={PRECOPOR} onChange={e => setPRECOPOR(e.target.value)}/> </div>
                                </div>
                                <div class="agp-input">
                                    <div class="number-student"> Avaliação: </div>  
                                    <div class="input"> <input type="text" value={AVALIACAO} onChange={e => setAVALIACAO(e.target.value)}/> </div> 
                                    <div class="class-student" style={{marginLeft: "30px", marginRight:"34px"}}> Estoque: </div>  
                                    <div class="input"> <input type="text" value={ESTOQUE} onChange={e => setESTOQUE(e.target.value)}/> </div> 
                                </div>
                                <div class="agp-input">
                                    <div class="number-student"> Link Imagem: </div>  
                                    <div class="input"> <input style={{width:"549px"}} type="text" value={IMG} onChange={e => setIMG(e.target.value)}/> </div> 
                                </div>
                                <div class="agp-input">
                                    <div class="number-student2"> Descrição: </div>  
                                    <div class="inputNOVO"> <textarea style={{ resize: "none", width:"549px", height: "154px"}} rows="5" cols="33" type="text" value={DESCRICAO} onChange={e => setDESCRICAO(e.target.value)}/> </div> 
                                </div>
                            </div>

                            
                            
                            <div class="button-create"> <button onClick={inserir}> {IDALTERNATIVO == 0 ? "Cadastrar" : "Alterar"} </button> </div>
                        </div>
                    </div>

                    <div class="student-registered-box">
                        <div class="row-bar"> 
                            <div class="bar-new-student"> </div>
                            <div class="text-registered-student"> Produtos Cadastrados </div>
                        </div>
                    
                        <table class ="table-user">
                            <thead>
                                <tr>
                                    <th className = "coluna-acao"></th>
                                    <th> ID </th>
                                    <th> Produto </th>
                                    <th> Categoria </th>
                                    <th> Preço </th>
                                    <th> Estoque </th>
                                    <th class="coluna-acao"> </th>
                                    <th class="coluna-acao"> </th>
                                </tr>
                            </thead>
                    
                            <tbody>
                                {produto.map((item, i) =>
                                    
                                <tr classname={i % 2 == 0 ? "linha-alternada" : ""}>
                                    <td>
                    {" "}
                    <img src={item.img_produto} style={{width: '40px', height:'40px' }} />{" "}
                  </td>
                                    <td> {item.id_produto} </td>
                                    <td title={item.nm_produto}>
                                             {item.nm_produto != null && item.nm_produto.length >= 25 
                                                ? item.nm_produto.substr(0, 25) + '...' 
                                                : item.nm_produto}
                                    </td>
                                    <td> {item.ds_categoria} </td>
                                    <td> {"R$" + item.vl_preco_por} </td>
                                    <td> {item.qtd_estoque} </td>
                                    <td className="coluna-acao"> <button onClick={() => editar(item) }> <img src="/assets/images/edit.svg" alt="" /> </button> </td>
                                    <td className="coluna-acao"> <button onClick={() => remover(item.id_produto) }> <img src="/assets/images/trash.svg" alt="" /> </button> </td>
                                </tr>

                            )}
                               
                                
                            </tbody> 
                        </table>
                    </div>
                </div>
            </Conteudo>
        </Container>
    )
}